let health = document.getElementById('health')
let starsContainer = document.querySelector('.stars-info')
let bankcash = document.getElementById('bankm')

cef.emit('game:hud:setComponentVisible', 'interface', false)

cef.emit('game:data:pollPlayerStats', true, 50)

var fpsOut = document.getElementById('fps')

const getFPS = () =>
	new Promise(resolve =>
		requestAnimationFrame(t1 =>
			requestAnimationFrame(t2 => resolve(1000 / (t2 - t1)))
		)
	)

setInterval(function () {
	getFPS().then(fps => {
		var color = ''
		if (fps < 10) color = '#f04245'
		if (fps > 10 && fps <= 30) color = '#ffcc00'
		if (fps > 30) color = '#6699ff'
		fpsOut.style = `color: ${color};`
		fpsOut.innerHTML = Math.round(fps)
	})
}, 1000)
cef.on('data:hud:stats', hud => {
	HudVisible(hud)
})
cef.on('data:vehicle', (door, far, engine, left, right, park, fuels) => {
	SetSpeed(1, engine)
	SetSpeed(2, door)
	SetSpeed(3, far)
	SetSpeed(4, right)
	SetSpeed(5, left)
	SetSpeed(6, park)
	document.getElementById('benz').value = fuels
})
cef.on('game:data:xpayday', xpayday => {
	document.getElementById('xpayday').innerHTML = xpayday
})
cef.on('game:data:online', onlineMax => {
	document.getElementById('online').innerHTML = onlineMax
})
cef.on('game:data:playerID', playerid => {
	document.getElementById('playerid').innerHTML = playerid
})

cef.on('game:data:playerBankCash', response => {
	bankcash.innerHTML = divideNumberByPieces(response, '')

	function divideNumberByPieces(x, delimiter) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || ' ')
	}
})
cef.on('game:data:playerHunger', hunger => {
	const foodBar = document.getElementById('food')
	foodBar.style.width = (hunger / 100) * 100 + '%'
})
cef.on(
	'game:data:playerStats',
	(
		hp,
		max_hp,
		arm,
		breath,
		wanted,
		weapon,
		ammo,
		max_ammo,
		money,
		speed,
		hunger
	) => {
		const healthBar = document.getElementById('health')
		healthBar.style.width = (hp / max_hp) * 100 + '%'

		const breathBar = document.getElementById('breath')
		breathBar.style.width = (breath / 100) * 100 + '%'

		const armorBar = document.getElementById('armor')
		armorBar.style.width = (arm / 100) * 100 + '%'

		cash.innerHTML = divideNumberByPieces(money, '')

		function divideNumberByPieces(x, delimiter) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || ' ')
		}

		document.getElementById('ammo').src = './img/guns/' + weapon + '.png'
		document.getElementById('weapon').textContent = ammo
		document.getElementById('max-weapon').textContent = max_ammo

		SetWantedLevel(wanted)
		SetSpeed(7, parseInt(speed, 10))
	}
)
function SetWantedLevel(wanted) {
	for (let i = 0; i <= 5; i++) {
		let star = document.getElementById('w' + i)
		if (i < wanted) {
			star.classList.add('stars-active')
		} else {
			star.classList.remove('stars-active')
		}
	}
}
cef.on('show-fps', () => {
	fpsOut.style = 'display: block'
})
function SetSpeed(id, params) {
	switch (id) {
		case 1: {
			if (params == 1) {
				document.getElementById('engine').src = './img/engineon.png'
			} else {
				document.getElementById('engine').src = './img/engine.png'
			}
			break
		}
		case 2: {
			if (params == 1) {
				document.getElementById('keys').src = './img/keys.png'
			} else {
				document.getElementById('keys').src = './img/keysoff.png'
			}
			break
		}
		case 3: {
			if (params == 1) {
				document.getElementById('far').src = './img/faro.png'
			} else {
				document.getElementById('far').src = './img/far.png'
			}
			break
		}
		case 4: {
			if (params == 1) {
				document.getElementById('right').src = './img/righton.png'
			} else {
				document.getElementById('right').src = './img/right.png'
			}
			break
		}
		case 5: {
			if (params == 1) {
				document.getElementById('left').src = './img/lefton.png'
			} else {
				document.getElementById('left').src = './img/left.png'
			}
			break
		}
		case 6: {
			if (params == 1) {
				document.getElementById('park').src = './img/park.png'
			} else {
				document.getElementById('park').src = './img/parkoff.png'
			}
			break
		}
		case 7: {
			document.getElementById('speed').textContent = params

			var path = document.querySelector('path[stroke="url(#paint222_linear)"]')

			var newOffset = (838 * (100 - params)) / 100

			path.style.strokeDashoffset = newOffset
			break
		}
	}
}
function HudVisible(visible) {
	let v = visible
	if (v == 5) {
		document.getElementById('speeds').style.display = 'block'
	}
	if (v == -1) {
		document.getElementById('speeds').style.display = 'none'
	}
}
