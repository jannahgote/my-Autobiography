document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.grid-section');
    const title = document.querySelector('.clickable-title');
    const flickerText = document.querySelector('.flicker-text');
    const nameClickableArea = document.querySelector('.name-clickable-area');
    
    let isTransitioning = false;
    
    const scrollDeltaThreshold = 50; 
    let accumulatedDelta = 0;

    
    if (section) {
        section.style.opacity = 1;
        
        setTimeout(() => {
            section.classList.add('scale-in-ver-center');
        }, 10);

        section.addEventListener('animationend', (event) => {
            if (event.animationName === 'scale-in-ver-center' && title) {
                title.classList.add('tracking-in-expand');
            }
        });
    }

    
    if (title && title.dataset.nav) {
        title.addEventListener('click', () => {
            window.location.href = title.dataset.nav;
        });
    }
    
    if (flickerText && flickerText.dataset.nav) {
        flickerText.addEventListener('click', () => {
            window.location.href = flickerText.dataset.nav;
        });
    }

    if (nameClickableArea && nameClickableArea.dataset.nav) {
        nameClickableArea.addEventListener('click', () => {
            window.location.href = nameClickableArea.dataset.nav;
        });
    }

    
    
    if (document.body.id === 'early-life-page') {
        const sections = document.querySelectorAll('.scroll-section');
        let currentSectionIndex = 0;

        document.body.style.overflow = 'hidden';

        sections.forEach((s, index) => {
            if (index !== 0) {
                s.classList.add('is-hidden');
            }
        });

        const showSection = (index) => {
            sections.forEach(s => s.classList.add('is-hidden'));
            
            const targetSection = sections[index];
            targetSection.classList.remove('is-hidden');
            
            targetSection.classList.remove('scale-out-horizontal');
            targetSection.classList.remove('scale-in-ver-center');
            
            setTimeout(() => {
                targetSection.classList.add('scale-in-ver-center');
                isTransitioning = false;
            }, 50); 
        };

        const initiateTransition = (direction) => {
            if (isTransitioning) return;
            isTransitioning = true;
            
            let targetIndex = currentSectionIndex;

            if (direction === 'down') {
                if (currentSectionIndex < sections.length - 1) {
                    targetIndex++;
                } else {
                    
                    window.location.href = 'index.html'; 
                    return;
                }
            } else if (direction === 'up' && currentSectionIndex > 0) {
                targetIndex--;
            } else {
                isTransitioning = false;
                return;
            }

            
            const currentSection = sections[currentSectionIndex];
            currentSection.classList.add('scale-out-horizontal');
            
            
            currentSection.addEventListener('animationend', function handler(e) {
                if (e.animationName === 'scale-out-horizontal') {
                    currentSection.removeEventListener('animationend', handler);
                    
                    
                    currentSectionIndex = targetIndex;
                    showSection(currentSectionIndex);
                }
            });
        };


        const handleScroll = (event) => {
            event.preventDefault(); 
            
            accumulatedDelta += event.deltaY;
            
            const direction = accumulatedDelta > 0 ? 'down' : 'up';
            const absoluteDelta = Math.abs(accumulatedDelta);

            if (absoluteDelta >= scrollDeltaThreshold) {
               
                accumulatedDelta = 0; 
                initiateTransition(direction);
            }
        };

        window.addEventListener('wheel', handleScroll, { passive: false });
    }
});