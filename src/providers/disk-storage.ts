import fs from 'node:fs'
import path from 'node:path'
import { tmpFolder } from '@/config/upload'

const uploadsFolder = path.resolve(tmpFolder, 'uploads')

export class DiskStorage {
  async saveFile(file: any) {
    await fs.promises.rename(
      path.resolve(tmpFolder, file),
      path.resolve(uploadsFolder, file),
    )

    return file
  }

  async deleteFile(file: any) {
    const filePath = path.resolve(uploadsFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
