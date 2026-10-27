const focusingPanel = document.querySelector('#music-focusing')
const trackAudios = document.querySelectorAll('.track-card audio')
const audioPlaceholders = new Map()
let activeAudio = null

trackAudios.forEach((audio) => {
   const placeholder = document.createElement('span')
   placeholder.hidden = true
   audio.before(placeholder)
   audioPlaceholders.set(audio, placeholder)

   audio.addEventListener('play', () => {
      if (activeAudio && activeAudio !== audio) {
         activeAudio.pause()
         audioPlaceholders.get(activeAudio)?.after(activeAudio)
      }

      const trackCard = audio.closest('.track-card')
      const cover = trackCard?.querySelector('.track-cover')
      const title = trackCard?.querySelector('.track-info h3')?.textContent?.trim()
      const artist = trackCard?.querySelector('.track-info p')?.textContent?.trim()
      if (!cover || !focusingPanel) return

      const nowPlayingCover = cover.cloneNode()
      nowPlayingCover.className = 'now-playing-cover'

      const info = document.createElement('div')
      info.className = 'now-playing-info'

      const heading = document.createElement('h2')
      heading.textContent = title || audio.getAttribute('aria-label') || 'Now playing'

      const artistText = document.createElement('p')
      artistText.textContent = artist || ''

      info.append(heading, artistText)
      focusingPanel.replaceChildren(nowPlayingCover, info, audio)
      focusingPanel.hidden = false
      activeAudio = audio
   })
})
