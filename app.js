class DrumKit {
	constructor(bpm) {
		this.pads = document.querySelectorAll('.pad')
		this.playBtn = document.querySelector('.play')
		this.currentKick = './sounds/kick-classic'
		this.currentSnare = './sounds/snare-acoustic01.wav'
		this.currentHihat = './sounds/hihat-acoustic01.wav'
		this.kickAudio = document.querySelector('.kick-sound')
		this.snareAudio = document.querySelector('.snare-sound')
		this.hihatAudio = document.querySelector('.hihat-sound')
		this.index = 0
		this.bpm = bpm
		this.isPlaying = null
		this.selects = document.querySelectorAll('select')
		this.muteBtns = document.querySelectorAll('.mute')
		this.tempoSlider = document.querySelector('.tempo-slider')
	}

	activePad() {
		this.classList.toggle('active')
	}

	repeat = () => {
		let step = this.index % 8

		const activeBars = document.querySelectorAll(`.b${step}`)
		activeBars.forEach((bar) => {
			bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
			// Check if pads of a bar are active
			if (bar.classList.contains('active')) {
				// Check which sounds are active
				if (bar.classList.contains('kick-pad')) {
					this.kickAudio.currentTime = 0
					this.kickAudio.play()
				}
				if (bar.classList.contains('snare-pad')) {
					this.snareAudio.currentTime = 0
					this.snareAudio.play()
				}
				if (bar.classList.contains('hihat-pad')) {
					this.hihatAudio.currentTime = 0
					this.hihatAudio.play()
				}
			}
		})
		this.index++
	}

	start = () => {
		// Check if the interval is already set
		if (!this.isPlaying) {
			let interval = (60 / this.bpm) * 1000
			this.playBtn.innerText = 'Stop'
			this.playBtn.classList.add('active')
			this.isPlaying = setInterval(() => {
				this.repeat()
			}, interval)
		} else {
			// Remove interval
			clearInterval(this.isPlaying)
			this.isPlaying = null
			this.index = 0
			this.playBtn.innerText = 'Play'
			this.playBtn.classList.remove('active')
		}
	}

	changeSound = function (e) {
		let selectionName = e.target.name
		let selectionValue = e.target.value

		switch (selectionName) {
			case 'kick-select':
				this.kickAudio.src = selectionValue
				break
			case 'snare-select':
				this.snareAudio.src = selectionValue
				break
			case 'hihat-select':
				this.hihatAudio.src = selectionValue
				break
			default:
				this.kickAudio.src = currentKick
				this.snareAudio.src = currentSnare
				this.hihatAudio.src = currentHihat
				break
		}
	}

	mute = function (e) {
		const muteIndex = e.target.getAttribute('data-track')
		e.target.classList.toggle('active')
		if (e.target.classList.contains('active')) {
			switch (muteIndex) {
				case '0':
					this.kickAudio.volume = 0
					break
				case '1':
					this.snareAudio.volume = 0
					break
				case '2':
					this.hihatAudio.volume = 0
					break
			}
		} else {
			switch (muteIndex) {
				case '0':
					this.kickAudio.volume = 1
					break
				case '1':
					this.snareAudio.volume = 1
					break
				case '2':
					this.hihatAudio.volume = 1
					break
			}
		}
	}

	changeTempoText(e) {
		const tempoText = document.querySelector('.tempo-nr')
		tempoText.innerText = e.target.value
	}

	updateTempo(e) {
		this.bpm = e.target.value
		clearInterval(this.isPlaying)
		this.isPlaying = null

		const playBtn = document.querySelector('.play')
		if (playBtn.classList.contains('active')) {
			this.start()
		}
	}
}

const drumKit = new DrumKit(180)

// Event Listeners

drumKit.pads.forEach((pad) => {
	pad.addEventListener('click', drumKit.activePad)
	pad.addEventListener('animationend', function () {
		this.style.animation = ''
	})
})

drumKit.playBtn.addEventListener('click', drumKit.start)

drumKit.selects.forEach((select) => {
	select.addEventListener('change', function (e) {
		drumKit.changeSound(e)
	})
})

drumKit.muteBtns.forEach((btn) => {
	btn.addEventListener('click', function (e) {
		drumKit.mute(e)
	})
})

drumKit.tempoSlider.addEventListener('input', function (e) {
	drumKit.changeTempoText(e)
})

drumKit.tempoSlider.addEventListener('change', function (e) {
	drumKit.updateTempo(e)
})
