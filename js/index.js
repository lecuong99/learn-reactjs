document.addEventListener('DOMContentLoaded', function () {
    var slideList = document.querySelectorAll('._1slide')
    var btnNext = document.querySelector('.btn-next')
    var btnPrev = document.querySelector('.btn-prev')
    const playList = document.querySelector('.play-list')



    const app = {
        list : [
            {
                name : 'Nhạc Việt Hôm Nay Nghe Gì?',
                images : './images/playlist1.jpg',
                link: './playlist.html',
            },
            {
                name : 'V-Pop 2021 Nghe Gì?',
                images : './images/playlist2.jpg',
                link: './playlist.html',
            },
            {
                name : 'Khi HIT Rồi Thì Mình Làm Gì?',
                images : './images/playlist3.jpg',
                link: './playlist.html',
            },
            {
                name : 'Xuân Hạ Thu Đông Rồi Lại Xuân',
                images : './images/playlist4.jpg',
                link: './playlist.html',
            },
            {
                name : 'Góc Nhạc Slim V',
                images : './images/playlist5.jpg',
                link: './playlist.html',
            },
            {
                name : 'EDM Việt Gây Nghiện',
                images : './images/playlist6.jpg',
                link: './playlist.html',
            }
        ],

        render : function () {
            
            const htmls = this.list.map((item) => {
                return `
                <div class="_1list">
                    <a href="${item.link}" class="_1list-link">
                        <img src="${item.images}" alt="">
                        <span>${item.name}</span>
                    </a>
                </div> 
                `
            })
            playList.innerHTML = htmls.join('')
        },

        clickBtnSlide :  function () {
            var currentIndex = 0
            var nextIndex = currentIndex + 1
            var prevIndex = slideList.length - 1

            slideList.forEach((slide, index) => {
                if(index == currentIndex) {
                    slide.classList.add('active')
                } else if(index == nextIndex) {
                    slide.classList.add('left')
                } else if(index == prevIndex) {
                    slide.classList.add('right')
                }
            })

            setInterval(() => {
                btnNext.click()
            }, 10000);

            btnNext.onclick = function () {
                if(currentIndex > 0 && currentIndex < (slideList.length - 2)) {
                    currentIndex++
                    prevIndex++
                    nextIndex++
                } else if(currentIndex == 0) {
                    currentIndex++
                    prevIndex = 0
                    nextIndex++
                } else if(currentIndex == slideList.length - 2) {
                    currentIndex = slideList.length - 1;
                    prevIndex++
                    nextIndex = 0
                } else if(currentIndex == slideList.length - 1) {
                    currentIndex = 0
                    nextIndex++
                    prevIndex++
                }
                            
                slideList.forEach((slide, index) => {
                    slide.classList.remove('active', 'right', 'left', 'active1', 'right1', 'left1')
                    if(index == currentIndex) {
                        slide.classList.add('active')
                        slide.classList.remove('left', 'right', 'active1', 'right1', 'left1')
                    } else if(index == nextIndex) {
                        slide.classList.add('left')
                        slide.classList.remove('active', 'right', 'active1', 'right1', 'left1')
                    } else if(index == prevIndex) {
                        slide.classList.add('right')
                        slide.classList.remove('left', 'active', 'active1', 'right1', 'left1')
                    }
                })
            }

            btnPrev.onclick = function () {
                if(currentIndex > 1 && currentIndex < (slideList.length - 1)) {
                    currentIndex--
                    prevIndex--
                    nextIndex--
                } else if(currentIndex == 0) {
                    currentIndex = slideList.length - 1
                    prevIndex--
                    nextIndex--
                } else if(currentIndex == 1) {
                    currentIndex--
                    prevIndex = slideList.length - 1
                    nextIndex--
                } else if(currentIndex == slideList.length - 1) {
                    currentIndex--
                    nextIndex = slideList.length - 1
                    prevIndex--
                }

                slideList.forEach((slide, index) => {
                    slide.classList.remove('active', 'right', 'left', 'active1', 'right1', 'left1')
                    if(index == currentIndex) {
                        slide.classList.add('active1')
                        slide.classList.remove('left1', 'right1', 'active', 'right', 'left')
                    } else if(index == nextIndex) {
                        slide.classList.add('left1')
                        slide.classList.remove('active1', 'right1', 'active', 'right', 'left')
                    } else if(index == prevIndex) {
                        slide.classList.add('right1')
                        slide.classList.remove('left1', 'active1', 'active', 'right', 'left')
                    }
                })
            }
        },
        start : function () {
            this.clickBtnSlide()
            this.render()
        }

    }


    app.start()
})