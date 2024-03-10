const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;


let inputFilePath = null

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById('input-file').addEventListener('click', async (e) => {
    inputFilePath = await open({ multiple: false });
    
    if (inputFilePath) {
      const inputElm = e.target
      const iconPath = 'url("assets/upload.png")'
      inputElm.parentNode.children[0].style.backgroundImage = iconPath
    }
  })


  document.getElementById('enc-btn').addEventListener('click', async () => {
    const path = getInputFilePath()
    if (path === 'Not uploaded!') {
      showNotification('Please upload a file first', 5000)
    } else {
      btnDisable()
      showProcess()
      showNotification('Encrypting your file now...', -1)

      setTimeout(async () => {
        const resp = await invoke("encrypt", { filepath: inputFilePath })
        showNotification(resp, 5000)
        defaultUpload()
        btnEnable()
      }, 2000)
    }
  })

  document.getElementById('dec-btn').addEventListener('click', async () => {
    const path = getInputFilePath()
    if (path === 'Not uploaded!') {
      showNotification('Please upload a file first', 5000)
    } else {
      btnDisable()
      showProcess()
      showNotification('Decrypting your file now...', -1)

      setTimeout(async () => {
        const resp = await invoke("decrypt", { filepath: inputFilePath })
        showNotification(resp, 5000)
        defaultUpload()
        btnEnable()
      }, 2000)
    }
  })
});

function showProcess() {
  const elm = document.getElementById('input-file')
  const iconPath = 'url("assets/process.gif")'
  elm.style.margin = '85px'
  elm.style.width = '150px'
  elm.style.height = '150px'
  elm.style.backgroundImage = iconPath
}

function defaultUpload() {
  const elm = document.getElementById('input-file')
  const iconPath = 'url("assets/upload-default.png")'
  elm.style.margin = '0'
  elm.style.width = '320px'
  elm.style.height = '320px'
  elm.style.backgroundImage = iconPath

  inputFilePath = null
}

function showNotification(message, timeout) {
  const elm = document.getElementById('notify')
  elm.textContent = message
  elm.classList.add('show')

  if (timeout !== -1) {
    setTimeout(() => { elm.classList.remove('show') }, timeout)
  }
}

function getInputFilePath() {
  if (inputFilePath) {
    const elm = document.getElementById('input-file')
    const iconPath = 'url("assets/upload-default.png")'
    elm.style.backgroundImage = iconPath
    return inputFilePath
  } else {
    return 'Not uploaded!'
  }
}

function btnDisable() {
  const encBtn = document.getElementById('enc-btn')
  encBtn.disable = true
  encBtn.style.opacity = '0.5'

  const decBtn = document.getElementById('dec-btn')
  decBtn.disable = true
  decBtn.style.opacity = '0.5'
}

function btnEnable() {
  const encBtn = document.getElementById('enc-btn')
  encBtn.disable = false
  encBtn.style.opacity = '1'

  const decBtn = document.getElementById('dec-btn')
  decBtn.disable = false
  decBtn.style.opacity = '1'
}

