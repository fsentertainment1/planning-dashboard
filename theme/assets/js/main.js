/* ============================================================
   NullPoint Ghost Theme — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile menu toggle --------------------------------
  const menuBtn = document.getElementById('mobile-menu-btn')
  const mobileMenu = document.getElementById('mobile-menu')
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
    })
  }

  // ---- Reading progress bar ------------------------------
  const progressBar = document.getElementById('reading-progress')
  if (progressBar && document.querySelector('.gh-content')) {
    const updateProgress = () => {
      const article = document.querySelector('.gh-content')
      if (!article) return
      const rect = article.getBoundingClientRect()
      const articleHeight = article.offsetHeight
      const scrolled = window.scrollY - article.offsetTop
      const progress = Math.min(Math.max(scrolled / articleHeight, 0), 1)
      progressBar.style.width = (progress * 100) + '%'
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
  }

  // ---- Table of Contents generator ----------------------
  const tocContainer = document.getElementById('toc-container')
  const toc = document.getElementById('toc')
  const content = document.querySelector('.gh-content')

  if (tocContainer && toc && content) {
    const headings = content.querySelectorAll('h2, h3')

    if (headings.length > 2) {
      tocContainer.classList.remove('hidden')

      headings.forEach((heading, i) => {
        // Ensure heading has an id for anchor links
        if (!heading.id) {
          heading.id = 'heading-' + i + '-' + heading.textContent
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }

        const link = document.createElement('a')
        link.href = '#' + heading.id
        link.textContent = heading.textContent
        link.className = heading.tagName === 'H2'
          ? 'block text-text-muted hover:text-accent-orange transition-colors py-1 text-sm border-l-2 border-base-500 pl-3 hover:border-accent-orange'
          : 'block text-text-dim hover:text-text-muted transition-colors py-0.5 text-xs border-l-2 border-base-600 pl-5 hover:border-base-400'

        link.setAttribute('data-toc-target', heading.id)
        toc.appendChild(link)
      })

      // Highlight active section on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id
          const link = toc.querySelector(`[data-toc-target="${id}"]`)
          if (!link) return
          if (entry.isIntersecting) {
            toc.querySelectorAll('a').forEach(a => a.classList.remove('text-accent-orange', 'border-accent-orange'))
            link.classList.add('text-accent-orange', 'border-accent-orange')
          }
        })
      }, { rootMargin: '-10% 0px -85% 0px' })

      headings.forEach(h => observer.observe(h))
    }
  }

  // ---- Smooth scroll for anchor links --------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })

  // ---- Code block copy button ----------------------------
  document.querySelectorAll('.gh-content pre').forEach(block => {
    const btn = document.createElement('button')
    btn.className = 'absolute top-3 right-3 text-xs text-text-dim hover:text-text-muted bg-base-700 border border-base-500 rounded px-2 py-1 transition-colors'
    btn.textContent = 'Copy'
    block.style.position = 'relative'
    block.appendChild(btn)

    btn.addEventListener('click', () => {
      const code = block.querySelector('code')
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
          btn.textContent = 'Copied!'
          setTimeout(() => { btn.textContent = 'Copy' }, 2000)
        })
      }
    })
  })

  // ---- External link indicator ---------------------------
  const hostname = window.location.hostname
  document.querySelectorAll('.gh-content a').forEach(link => {
    if (link.hostname && link.hostname !== hostname) {
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')
    }
  })

  // ---- Lazy image intersection loading -------------------
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            imgObserver.unobserve(img)
          }
        }
      })
    }, { rootMargin: '200px 0px' })

    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img))
  }

})
