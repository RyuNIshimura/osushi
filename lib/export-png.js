import domtoimage from 'dom-to-image'

export function downloadBlob(blob, name) {
  const blobUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = name
  document.body.appendChild(link)
  link.dispatchEvent(
    new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
    })
  )

  document.body.removeChild(link)
}

export function exportPNG(pngId) {
  const node = document.getElementById(pngId)
  domtoimage.toPng(node, { width: node.scrollWidth, height: node.scrollHeight })
    .then(function (dataUrl) {
      const img = new Image()
      img.src = dataUrl
      document.body.appendChild(img)
      domtoimage.toBlob(document.getElementById(pngId))
        .then(function (blob) {
          downloadBlob(blob, `${pngId}.png`) 
        })
      document.body.removeChild(img)
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
    })
}