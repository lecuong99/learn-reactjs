document.addEventListener('DOMContentLoaded', function () {

    const listSongs = document.querySelector('.right .songs')
    const listSong2s = document.querySelector('.list .songs')
    const btnPlay = document.querySelector('.image-left .circle')
    const cd = document.querySelector('.image-left')
    const cdImages = document.querySelector('.image-left img')
    const cd1 = document.querySelector('.cd')
    const textCd = document.querySelector('.left .continue')
    const btnTogglePlay = document.querySelector('.btn-toggle-play')
    const audio = document.querySelector('#audio')
    const songName =  document.querySelector('.song-name')
    const songSinger =  document.querySelector('.song-singer1')
    const btnNextSong = document.querySelector('.control .btn-next')
    const btnPrevSong = document.querySelector('.control .btn-prev')
    const btnRandomSong = document.querySelector('.control .btn-random')
    const btnRepeat = document.querySelector('.btn-repeat')
    const uploadSong = document.querySelector('.upload-song .upload')
    const songUp = document.querySelector('.song-name-up')
    const singerUp = document.querySelector('.song-singer')
    const pathUp = document.querySelector('.song-path')
    const imageUp = document.querySelector('.song-image')
    const submit = document.querySelector('.submit')
    const formUpload = document.querySelector('.form-upload')
    const alert = document.querySelector('#alert')
    const btnList2 = document.querySelector('.list-song')
    btnList2.style.display = 'none'

    const app = {
        isSong: 0,
        isRepeat: 0,
        isRandom: false,
        isRotate: false,
        arrayIndex2 : [],
        // songs : [
        //     {
        //         name: 'Tháng năm',
        //         singer: 'Soobin Hoàng Sơn',
        //         path: './music/ThangNamSpecialPerformance.mp3',
        //         images: './images/SoobinHoangSon.jpg'
        //     },
        //     {
        //         name: 'Phố đã lên đèn',
        //         singer: 'Huyền Tâm Môn',
        //         path: './music/pho-da-len-den.mp3',
        //         images: './images/pho-da-len-den.jpg'
        //     },
        //     {
        //         name: 'Xe anh đến đâu em theo đến đó',
        //         singer: 'Dương Hoàng Yến ft Đạt G',
        //         path: './music/XeAnhDenDauEmTheoDenDo.mp3',
        //         images: './images/DuongHoangYen.jpg'
        //     },
        //     {
        //         name: 'Độ đúng đời',
        //         singer: 'Độ Mixi',
        //         path: './music/DoDungDoi.mp3',
        //         images: './images/domixi.jpg'
        //     },
        //     {
        //         name: 'Phải chăng em đã yêu',
        //         singer: 'Juky San',
        //         path: './music/PhaiChangEmDaYeu.mp3',
        //         images: './images/JukySan.jpg'
        //     },
        //     {
        //         name: 'Sài Gòn đau lòng quá',
        //         singer: 'Hứa Kim Tuyền',
        //         path: './music/SaiGonDauLongQua.mp3',
        //         images: './images/HuaKimTuyen.jpg'
        //     },
        //     {
        //         name: 'Yêu Thầm',
        //         singer: 'Hoàng Yến Chibi ft Tlinh',
        //         path: './music/YeuTham.mp3',
        //         images: './images/HoangYen.jpg'
        //     },
        //     {
        //         name: 'Stream đến bao giờ ?',
        //         singer: 'Độ Mixi',
        //         path: './music/StreamDenBaoGio.mp3',
        //         images: './images/domixi2.jpg'
        //     },
        //     {
        //         name: 'Nàng thơ',
        //         singer: 'Hoàng Dũng',
        //         path: './music/NangTho.mp3',
        //         images: './images/HoangDung.jpg'
        //     },
        //     {
        //         name: 'Mơ hồ',
        //         singer: 'Bùi Anh Tuấn',
        //         path: './music/MoHo.mp3',
        //         images: './images/BuiAnhTuan1.jpg'
        //     },

        // ],
        songs : JSON.parse(localStorage.getItem('songs')),

        local : function () {
            localStorage.setItem('songs', JSON.stringify(this.songs))
        },

        renderSong : function() {
            const htmls = this.songs.map((song, index) => {
                return `
                    <div class="song" data-index="${index}">
                    <div class="song-left">
                        <img class="thumb" src="${song.images}">
                        </img>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        </div>
                        <div class="song-right">
                            <i class="far fa-trash-alt delete"></i>
                        </div>
                    </div>
                `
            })
            listSongs.innerHTML = htmls.join('')
        },

        loadSong : function () {
            const song = this.songs[this.isSong]
            cd1.src = song.images
            cdImages.src = song.images
            songSinger.innerHTML = song.singer
            songName.innerHTML = song.name
            audio.src = song.path

        },

        randomSong : function() {
            if(this.arrayIndex2.length === this.songs.length - 1) {
                this.arrayIndex2.splice(0, this.songs.length - 1)
            }
            this.arrayIndex2.push(this.isSong)
            let newIndex
            do {
                newIndex = Math.floor(Math.random() * this.songs.length)
            } while (this.arrayIndex2.indexOf(newIndex) != -1)
            this.isSong = newIndex
            this.loadSong()
        },

        nextSong: function () {
            this.isSong++
            if(this.isSong == this.songs.length) {
                this.isSong = 0
            }
            this.loadSong()
        },

        prevSong: function () {
            if(this.isSong == 0) {
                this.isSong = this.songs.length - 1
            } else {
                this.isSong--
            }
            this.loadSong()
        },

        activeSong : function() {
            const dsSong = document.querySelectorAll('.song')
            dsSong.forEach((song, index) => {
                song.classList.remove('playing')
                if(index == this.isSong) {
                    song.classList.add('playing')
                }
            })
        },

        activeSong2 : function() {
            const dsSong = document.querySelectorAll('.list .songs .song')
            dsSong.forEach((song, index) => {
                song.classList.remove('playing')
                if(index == this.isSong) {
                    song.classList.add('playing')
                }
            })
        },

        event : function () {

            var cdRotate = cd.animate([
                {
                    transform: 'rotate(360deg)'
                }
            ], {
                duration: 10000,
                iterations: Infinity
            })
            
            cdRotate.pause()
            var cdRotate1 = cd1.animate([
                {
                    transform: 'rotate(360deg)'
                }
            ], {
                duration: 10000,
                iterations: Infinity
            })
            
            cdRotate1.pause()

            btnPlay.onclick = function () {
                if(!app.isRotate) {
                    cdRotate.play()
                    cdRotate1.play()
                    cd.style.borderRadius = '50%'
                    app.isRotate = true
                    textCd.innerHTML = 'tạm dừng'
                    audio.play()
                } else {
                    cdRotate.pause()
                    cdRotate1.pause()
                    cd.style.borderRadius = '50%'
                    app.isRotate = false
                    textCd.innerHTML = 'tiếp tục phát'
                    audio.pause()
                }
                
            }
            textCd.onclick = function () {
                if(!app.isRotate) {
                    audio.play()
                    cdRotate.play()
                    cd.style.borderRadius = '50%'
                    app.isRotate = true
                    textCd.innerHTML = 'tạm dừng'
                } else {
                    audio.pause()
                    cdRotate.pause()
                    cd.style.borderRadius = '50%'
                    app.isRotate = false
                    textCd.innerHTML = 'tiếp tục phát'
                }
            }

            audio.onplay = function () {
                btnTogglePlay.classList.add('playing')
                cdRotate.play()
                cdRotate1.play()
                cd.style.borderRadius = '50%'
                app.isRotate = true
                textCd.innerHTML = 'tạm dừng'
            }

            audio.onpause = function () {
                btnTogglePlay.classList.remove('playing')
                cdRotate.pause()
                cdRotate1.pause()
                app.isRotate = false
                textCd.innerHTML = 'tiếp tục phát'
            }

            btnTogglePlay.onclick = function () {
                btnPlay.click()
            }

            btnNextSong.onclick = function () {
                if(app.isRandom) {
                    app.randomSong()
                    app.activeSong()
                    app.activeSong2()
                    audio.play()
                } else {
                    app.nextSong()
                    app.activeSong()
                    app.activeSong2()
                    audio.play()
                }
            }

            btnPrevSong.onclick = function () {
                if(app.isRandom) {
                    app.randomSong()
                    app.activeSong()
                    app.activeSong2()
                    audio.play()
                } else {
                    app.prevSong()
                    app.activeSong()
                    app.activeSong2()
                    audio.play()
                }
                
            }

            btnRandomSong.onclick = function () {
                if(!app.isRandom) {
                    this.classList.add('active')
                    app.isRandom = true
                } else {
                    this.classList.remove('active')
                    app.isRandom = false
                }
            }

            btnRepeat.onclick = function () {

                if(app.isRepeat === 0) {
                    this.classList.add('active')
                    app.isRepeat = 1
                } else if (app.isRepeat === 1) {
                    document.querySelector('.btn-repeat .redo').style.display = 'none'
                    document.querySelector('.btn-repeat .reply').style.display = 'block'
                    app.isRepeat = 2
                } else if (app.isRepeat === 2) {
                    document.querySelector('.btn-repeat .redo').style.display = 'block'
                    document.querySelector('.btn-repeat .reply').style.display = 'none'
                    this.classList.remove('active')
                    app.isRepeat = 0    
                }
            }

            audio.onended = function () {
                if(app.isRepeat === 2) {
                    audio.play()
                } else if(app.isRepeat === 1) {
                    btnNextSong.click()
                } else if(app.isRepeat === 0) {
                    if(app.isRandom) {
                        if(app.arrayIndex2.length === app.songs.length - 1) {
                            audio.pause()
                            app.arrayIndex2.splice(0, app.songs.length - 1)
                        } else {
                            btnNextSong.click()
                        }
                    } else {
                        if(app.isSong === app.songs.length - 1) {
                            audio.pause()
                        } else {
                            btnNextSong.click()
                        }
                    }
                }   
            }

            const dsSong = document.querySelectorAll('.song')
            listSong2s.onclick = function (e) {
               
                
                if(!e.target.closest('.song.active') && e.target.closest('.song') ) {
                    
                    const songIndex = Number(e.target.closest('.song').getAttribute('data-index'))
                    dsSong.forEach((song, index) => {
                        song.classList.remove('playing')
                        if(songIndex == index) {
                            song.classList.add('playing')
                        }
                    })
                    app.isSong = songIndex
                    app.loadSong()
                    app.activeSong2()
                    audio.play()               
                }
            }
            listSongs.onclick = function (e) {
               
                
                if(!e.target.closest('.song.active') && e.target.closest('.song') && !e.target.closest('.song-right')) {
                    
                    const songIndex = Number(e.target.closest('.song').getAttribute('data-index'))
                    dsSong.forEach((song, index) => {
                        song.classList.remove('playing')
                        if(songIndex == index) {
                            song.classList.add('playing')
                        }
                    })
                    app.isSong = songIndex
                    app.activeSong() 
                    app.loadSong()     
                    audio.play()
                                  
                } else if(e.target.closest('.song-right')) {
                    const songIndex = Number(e.target.closest('.song').getAttribute('data-index'))
                    dsSong.forEach((song, index) => {
                        if(songIndex == index) {
                            app.songs.splice(songIndex, 1)
                            if(songIndex == app.isSong) {
                                app.isSong = 0
                                cdRotate1.pause()
                                cdRotate.pause()
                                app.loadSong()
                                audio.pause()
                                textCd.innerHTML = 'tiếp tục phát'
                            }
                            if(songIndex < app.isSong) {
                                app.isSong--
                            }                           
                        }

                        app.renderSong()
                        app.activeSong()
                        // app.loadSong()
                    })
                }
                app.local()
            }

            uploadSong.onclick = function () {
                formUpload.classList.toggle('active')
            }

            submit.onclick = function () {

                if(pathUp.value && imageUp.value && singerUp.value.trim() && songUp.value.trim()) {
                    const x1 = pathUp.value
                    const y1 = './music/' + x1.slice(12, x1.length)
                    const x2 = imageUp.value
                    const y2 = './images/' + x2.slice(12, x2.length)

                    const newSong = {
                        name: songUp.value,
                        singer: singerUp.value,
                        path: y1,
                        images: y2,
                    }
                    
                    app.songs.push(newSong)
                    app.renderSong()
                    pathUp.value = ''
                    singerUp.value = ''
                    songUp.value=''
                    imageUp.value=''
                    alert.innerHTML = 'Thêm thành công'
                } else {
                    alert.innerHTML = 'Thêm không thành công'
                }
                app.local()
            }

        },

        start : function () {
            this.local()
            this.renderSong()
            this.loadSong()
            this.event()
            this.activeSong()
            this.activeSong2()
            
        }
    }
    app.start()
})