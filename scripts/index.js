window.onload = () => {

    let slider = document.getElementById('sub-alpha')
    let position = -570
    slider.style.left = `${position}px`

    document.addEventListener('keydown', (e) => {
        console.log("Event", e)

        // let position = slider.getAttribute('style')
        console.log("position", position)

        switch (e.key) {
            case 'ArrowLeft':
                position -= 10
                slider.style.left = `${position}px`
                console.log(position)
                break
            case "ArrowRight":
                position += 10
                slider.style.left = `${position}px`
                console.log(position)
        }
    })
}