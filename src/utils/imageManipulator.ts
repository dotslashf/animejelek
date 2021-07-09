import request from 'node-superfetch';
import createLogger from 'logging';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const logger = createLogger('Image Manipulator');

export async function downloadImage(url: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request.get(url);
      const buffer = response.raw!;
      logger.info('Image Buffer Downloaded');
      resolve(buffer);
    } catch (error) {
      logger.error('Image Buffer Error', error);
      reject(error);
    }
  });
}

export async function joinImage(buffer: Buffer): Promise<void> {
  const imgSrc = path.join(__dirname, '../img');
  try {
    const _buffer = await sharp(buffer)
      .resize(460, 665)
      .composite([{ input: `${imgSrc}/stamp.png` }])
      .sharpen()
      .png()
      .toBuffer();

    logger.info('Image Joined');
    await fs.writeFile(`${imgSrc}/final.png`, _buffer);
  } catch (error) {
    logger.error('Image Join Error', error);
    console.log(error);
  }
}
