document.addEventListener('DOMContentLoaded', function() {


    var listLeft = document.querySelector('.app__list ul')
    const iconHeart = document.querySelector('.icon-heart') 
    const listSongs = document.querySelector('.list .songs')
    const cd = document.querySelector('.cd')
    const songName =  document.querySelector('.song-name')
    const songSinger =  document.querySelector('.song-singer1')
    const btnTogglePlay = document.querySelector('.btn-toggle-play')
    const audio = document.querySelector('#audio')
    const progress = document.querySelector('.progress')
    const btnNextSong = document.querySelector('.control .btn-next')
    const btnPrevSong = document.querySelector('.control .btn-prev')
    const btnRandom = document.querySelector('.btn-random')
    const btnRepeat = document.querySelector('.btn-repeat')
    const btnList = document.querySelector('.list-song')
    const List = document.querySelector('.list')
    const volume = document.querySelector('.volumn')
    const btnVolumn = document.querySelector('.btn-volumn')
    const tshirt = document.querySelector('.tshirt')
    const logo = document.querySelector('.app__logo a img')
    const setting = document.querySelector('.setting')
    const settingShow = document.querySelector('.setting-show')
    const mouseClick = document.querySelector('.mouse-click') 
    const uploadSong = document.querySelector('.upload-song .upload')
    const songUp = document.querySelector('.song-name-up')
    const singerUp = document.querySelector('.song-singer')
    const pathUp = document.querySelector('.song-path')
    const imageUp = document.querySelector('.song-image')
    const submit = document.querySelector('.submit')
    const formUpload = document.querySelector('.form-upload')
    const alert = document.querySelector('#alert')
    const startSong = document.querySelector('.start-song')
    const endSong = document.querySelector('.end-song')
    const songAPI = 'http://localhost:3000/songs'
    const key = 'songs'
    const songs = JSON.parse(localStorage.getItem(key))

    


    const app = {

        isSong: 0,
        itemclick: 0,
        isClickLink: false,
        isClickHeart: false,
        isPlay: false,
        isRandom : false,
        isRepeat : 0 ,
        isList: false,
        isShirt: false,
        isSetting: false,
        arrayIndex: [],
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

        renderSong : function(songs) {

            const htmls = this.songs.map((song, index) => {
                return `
                    <div class="song" data-index="${index}">
                        <img class="thumb" src="${song.images}">
                        </img>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                    </div>
                `
            })
            listSongs.innerHTML = htmls.join('')
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

        randomSong : function() {
            if(this.arrayIndex.length === this.songs.length - 1) {
                this.arrayIndex.splice(0, this.songs.length - 1)
            }
            this.arrayIndex.push(this.isSong)
            let newIndex
            do {
                newIndex = Math.floor(Math.random() * this.songs.length)
            } while (this.arrayIndex.indexOf(newIndex) != -1)
            this.isSong = newIndex
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

        innerTime : function () {
            const x = Math.round(audio.duration/60)
            const y = Math.round(audio.duration%60)

            if(audio.duration) {
                if(x <10) {
                    if(y<10) {
                        endSong.innerHTML = '0'+x + ':' + '0'+y
                    } else {
                        endSong.innerHTML = '0'+x + ':'+y
                    }
                } else {
                    if(y<10) {
                        endSong.innerHTML = x + ':' + '0'+y
                    } else {
                        endSong.innerHTML = x + ':'+ y
                    }
                }
            }
            
            
        },

        timeUpdate : function () {
            const x1 = Math.round(audio.currentTime/60)
            const y1 = Math.round(audio.currentTime%60)

            if(audio.duration) {
                if(x1 <10) {
                    if(y1<10) {
                        startSong.innerHTML = '0'+x1 + ':' + '0'+y1
                    } else {
                        startSong.innerHTML = '0'+x1 + ':'+y1
                    }
                } else {
                    if(y<10) {
                        startSong.innerHTML = x1 + ':' + '0'+y1
                    } else {
                        startSong.innerHTML = x1 + ':'+ y1
                    }
                }
            }
        },



        loadSong : function () {
            const song = this.songs[this.isSong]
            cd.src = song.images
            songSinger.innerHTML = song.singer
            songName.innerHTML = song.name
            audio.src = song.path
        },

        event : function() {

            const dsSong = document.querySelectorAll('.songs .song')

            // khi click vào list ben trai app
            const listLeftItem = document.querySelectorAll('.app__list ul li')
            listLeftItem[app.itemclick].classList.add('active')
            listLeft.onclick = function (e) {               
                const dataItem = Number(e.target.closest('li').getAttribute('data-item'))
                app.itemclick = dataItem
                listLeftItem.forEach((item, index) => {
                    if(index == app.itemclick) {
                        item.classList.add('active')
                    } else {
                        item.classList.remove('active')
                    }
                })       
            }

            // click yêu thich
            iconHeart.onclick = function () {
                if(!app.isClickHeart) {
                    iconHeart.classList.add('active')
                    app.isClickHeart = true
                } else {
                    iconHeart.classList.remove('active')
                    app.isClickHeart = false
                }
            }

            // quay cd
            var cdRotate = cd.animate([
                {
                    transform: 'rotate(360deg)'
                }
            ], {
                duration: 5000,
                iterations: Infinity
            })
            
            cdRotate.pause()

            // click play
            btnTogglePlay.onclick = function () {
                if(!app.isPlay) {                    
                    audio.play()                   
                } else {       
                    audio.pause()                  
                }
            }

            // khi play
            audio.onplay = function () {
                app.isPlay = true
                btnTogglePlay.classList.add('playing')
                cdRotate.play()
                // app.innerTime()
            }

            // khi pause
            audio.onpause = function () {
                btnTogglePlay.classList.remove('playing')
                cdRotate.pause()
                app.isPlay = false
                app.innerTime()
            }

            // chạy time

            audio.ontimeupdate = function () {
                const timer = audio.currentTime / audio.duration * 100

                if(timer) {
                    progress.value = timer
                }
                app.innerTime()
                app.timeUpdate()
            }

            // tua
            progress.onchange = function () {
                const x = progress.value / 100 * audio.duration
                audio.currentTime = x
            }
            //  click next
            btnNextSong.onclick = function() {
                if(app.isRandom) {
                    app.randomSong()
                    audio.play()
                } else {
                    app.nextSong()
                    audio.play()
                }
                app.activeSong()         
            }

            btnPrevSong.onclick = function () {
                if(app.isRandom) {
                    app.randomSong()
                    audio.play()
                } else {
                    app.prevSong()
                    audio.play()
                }
                app.activeSong()
                app.innerTime()
            }

            // click random
            btnRandom.onclick = function () {
                if(app.isRandom) {
                    this.classList.remove('active')
                    app.isRandom = false
                } else {
                    this.classList.add('active')
                    app.isRandom = true
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

            // click song 
            listSongs.onclick = function (e) {
                
                if(!e.target.closest('.song.active') && e.target.closest('.song')) {
                    
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
                }
            }

            //  khi ht bai
            audio.onended = function () {
                if(app.isRepeat === 2) {
                    audio.play()
                } else if(app.isRepeat === 1) {
                    btnNextSong.click()
                } else if(app.isRepeat === 0) {
                    if(app.isRandom) {
                        if(app.arrayIndex.length === app.songs.length - 1) {
                            audio.pause()
                            app.arrayIndex.splice(0, app.songs.length - 1)
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

            // click hthi list
            btnList.onclick = function () {
                if(!app.isList) {
                    List.classList.add('active')
                    btnList.classList.add('active')
                    List.classList.remove('active1')
                    app.isList = true
                } else {
                    List.classList.remove('active')
                    List.classList.add('active1')
                    btnList.classList.remove('active')
                    app.isList = false
                }               
            }
            
            volume.value = 1*100
            
            volume.oninput = function () {
                const x = Number(volume.value) / 100
                if(x == 0) {
                    btnVolumn.classList.add('active')
                } else {
                    btnVolumn.classList.remove('active')
                }
                audio.volume = x
            }

            // click tshirt
            tshirt.onclick = function () {
                var newColor = document.documentElement.style
               if(!app.isShirt) {
                    newColor.setProperty('--left-color1', 'rgb(122,35,35)')
                    newColor.setProperty('--text-color1', 'rgb(218, 218, 218)')
                    newColor.setProperty('--body-color1', 'rgb(115,23,23)')
                    newColor.setProperty('--primary-color1', 'rgb(170,28,28)')
                    newColor.setProperty('--active-color1', 'rgb(136,57,57)')
                    newColor.setProperty('--bottom-color1', 'rgb(92,18,18)')
                    newColor.setProperty('--hover-color1', 'rgb(136,57,57)')
                    listLeft.classList.add('white')
                    logo.src = './images/logo-dark.png'
                    btnList.style.backgroundColor = 'rgb(109,42,42)'
                    app.isShirt = true
                } else {
                    newColor.setProperty('--left-color1', 'rgb(221,228,228)')
                    newColor.setProperty('--text-color1', 'rgb(50, 50, 61)')
                    newColor.setProperty('--body-color1', 'rgb(206,217,217)')
                    newColor.setProperty('--primary-color1', 'rgb(35, 146, 146)')
                    newColor.setProperty('--active-color1', 'rgb(231,236,236)')
                    newColor.setProperty('--bottom-color1', 'rgb(180, 208, 208)')
                    newColor.setProperty('--hover-color1', 'rgb(231,237,237)')
                    listLeft.classList.remove('white')
                    logo.src = './images/logo-mp3.png'
                    btnList.style.backgroundColor = 'rgb(190,212,212)'
                    app.isShirt = false
                }
            }

            // click setting

            setting.onclick = function () {
                if(!app.isSetting) {
                    settingShow.style.display = 'block'
                    app.isSetting = true
                } else {
                    settingShow.style.display = 'none'
                    app.isSetting =  false
                }
            }

            // click phai chuot
            window.oncontextmenu = function (e) {
                e.preventDefault()
                mouseClick.style.display = 'block'
                if(e.clientX > 1000) {
                    mouseClick.style.left = (e.clientX- mouseClick.offsetWidth) + 'px'
                } else {
                    mouseClick.style.left = e.clientX + 'px'
                }
                if (e.clientY > 400) {
                    mouseClick.style.top = (e.clientY - mouseClick.offsetHeight) + 'px'
                } else {
                    mouseClick.style.top = (e.clientY) + 'px'
                }              
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

            window.onmousedown = function () {
                mouseClick.style.display = 'none'
            }


        },

        start : function() {
            this.local()
            this.renderSong()
            this.event()  
            this.loadSong()
            this.activeSong()
        },

    }
    app.start()
    
})