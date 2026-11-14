
export function startUpload(fileName, { onProgress = () => {}, shouldFail = false } = {}) {
  let timer = null
  let progress = 0
  const failAt = 40 + Math.floor(Math.random() * 40)

  const promise = new Promise((resolve, reject) => {
    timer = setInterval(() => {
      progress = Math.min(100, progress + Math.floor(Math.random() * 9) + 3)

      if (shouldFail && progress >= failAt) {
        clearInterval(timer)
        reject({ fileName, progress: failAt, reason: 'Conexão interrompida' })
        return
      }

      onProgress(progress)

      if (progress >= 100) {
        clearInterval(timer)
        resolve({ fileName })
      }
    }, 150)
  })

  return {
    promise,
    cancel: () => clearInterval(timer)
  }
}
