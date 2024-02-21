let form = document.querySelector('form')
let normText = document.querySelector('#nt')
let enChunks = document.querySelector('#ec')
let enMessage = document.querySelector('#em')
let encodeButton = document.querySelector('#encode')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  normText.textContent = ''
  normText.style.color = 'white'
  let sentence = e.target.sentenceI.value
  console.log(sentence.length)
  if (sentence.length < 50) {
    e.target.sentenceI.placeholder = '50characters Min'
    normText.textContent = 'Error: Input 50 chars min'
    normText.style.color = 'red'
  } else {
    const normalized1 = sentence.replace(/[.,''<>?'' '''[ #!$%&;:{}=\-_`~()]/g, '').replace(/\s{2,}/g, '')
    const normalized = normalized1.toLowerCase()
    const arrOfNormalized = normalized.match(/.{1,8}/g)
    displayArr(arrOfNormalized, normText)

    encodeButton.addEventListener('click', () => { //(https://github.com/davyken/JS-Secret-Handshake/pull/1)
      const encodedArr = []
      for (let i = 0; i < arrOfNormalized.length; i++) {
        for (let j = 0; j < arrOfNormalized.length; j++) {
          encodedArr.push(arrOfNormalized[j][i])
        }
      }
      const encodedString1 = String(encodedArr)
      const encodedString = encodedString1.replaceAll(',', '')
      enChunks.textContent = encodedString
      // const n = arrOfNormalized.length
      const arrOfEncoded = encodedString.match(/.{1,6}/g)
      displayArr(arrOfEncoded, enMessage)
    })
  }
})

function displayArr (arr, mode) {
  for (let i = 0; i < arr.length; i++) {
    mode.innerHTML += '"' + arr[i] + '"' + '<br>'
  }
}
