import sharp from 'sharp';
import { readdir, mkdir, stat, rename, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const INPUT_DIR = './public/gallery';
const OUTPUT_DIR = './public/gallery-optimized';
const QUALITY = 80;
const FULL_MAX_WIDTH = 1920;   // Para lightbox
const THUMB_MAX_WIDTH = 800;   // Para la cuadrícula de galería
const CONCURRENCY = 4;         // Sharp es intensivo en CPU; limitar concurrencia

const SUPPORTED = ['.jpg', '.jpeg', '.png', '.webp'];

async function getFilesRecursive(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getFilesRecursive(fullPath) : fullPath;
  }));
  return files.flat();
}

async function processImage(inputPath, totalOriginal, totalOptimized) {
  const relativePath = path.relative(INPUT_DIR, inputPath);
  const baseName = path.basename(relativePath, path.extname(relativePath));
  const relDir = path.dirname(relativePath);

  const fullOutputPath = path.join(OUTPUT_DIR, relDir, baseName + '.webp');
  const thumbOutputPath = path.join(OUTPUT_DIR, relDir, baseName + '-thumb.webp');

  const outputFolder = path.join(OUTPUT_DIR, relDir);
  if (!existsSync(outputFolder)) {
    await mkdir(outputFolder, { recursive: true });
  }

  const { size: originalSize } = await stat(inputPath);

  await Promise.all([
    // Versión completa para lightbox
    sharp(inputPath)
      .resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(fullOutputPath),
    // Thumbnail para la cuadrícula
    sharp(inputPath)
      .resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(thumbOutputPath),
  ]);

  const [{ size: fullSize }, { size: thumbSize }] = await Promise.all([
    stat(fullOutputPath),
    stat(thumbOutputPath),
  ]);

  const optimizedSize = fullSize + thumbSize;
  totalOriginal.value += originalSize;
  totalOptimized.value += optimizedSize;

  const reduction = (((originalSize - fullSize) / originalSize) * 100).toFixed(1);
  const originalMB = (originalSize / 1024 / 1024).toFixed(2);
  const fullKB = (fullSize / 1024).toFixed(0);
  const thumbKB = (thumbSize / 1024).toFixed(0);

  console.log(`✅ ${relativePath}`);
  console.log(`   Original: ${originalMB} MB  →  full: ${fullKB} KB | thumb: ${thumbKB} KB  (-${reduction}%)\n`);
}

async function runWithConcurrency(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = task().finally(() => executing.delete(p));
    results.push(p);
    executing.add(p);
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

async function optimizeImages() {
  if (!existsSync(INPUT_DIR)) {
    console.error(`❌ No se encontró el directorio: ${INPUT_DIR}`);
    process.exit(1);
  }

  const allFiles = await getFilesRecursive(INPUT_DIR);
  const images = allFiles.filter(f => SUPPORTED.includes(path.extname(f).toLowerCase()));

  if (images.length === 0) {
    console.log('⚠️  No se encontraron imágenes para optimizar.');
    return;
  }

  console.log(`\n📸 Encontradas ${images.length} imágenes — procesando con concurrencia ${CONCURRENCY}...\n`);

  const totalOriginal = { value: 0 };
  const totalOptimized = { value: 0 };
  const errors = [];

  const tasks = images.map(inputPath => async () => {
    try {
      await processImage(inputPath, totalOriginal, totalOptimized);
    } catch (err) {
      errors.push({ inputPath, message: err.message });
      console.error(`❌ Error en ${path.relative(INPUT_DIR, inputPath)}: ${err.message}\n`);
    }
  });

  await runWithConcurrency(tasks, CONCURRENCY);

  const totalReduction = (((totalOriginal.value - totalOptimized.value) / totalOriginal.value) * 100).toFixed(1);

  console.log('─'.repeat(55));
  console.log('📊 RESUMEN');
  console.log(`   Original:   ${(totalOriginal.value / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Optimizado: ${(totalOptimized.value / 1024 / 1024).toFixed(1)} MB (full + thumbs)`);
  console.log(`   Reducción:  ${totalReduction}%`);
  if (errors.length > 0) {
    console.log(`   Errores:    ${errors.length} archivo(s) fallaron`);
  }
  console.log('─'.repeat(55));
  console.log('\n📂 SIGUIENTE PASO:');
  console.log('   Las imágenes optimizadas están en: public/gallery-optimized/');
  console.log('   Estructura generada:');
  console.log('     *.webp       → versión completa (lightbox)');
  console.log('     *-thumb.webp → thumbnail (cuadrícula)');
  console.log('\n   Para reemplazar las originales:');
  console.log('     1. Renombra public/gallery → public/gallery-original (backup)');
  console.log('     2. Renombra public/gallery-optimized → public/gallery');
  console.log('     3. Actualiza los src en src/data/content.ts a .webp');
  console.log('─'.repeat(55));
}

optimizeImages().catch(console.error);
