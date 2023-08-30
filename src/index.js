
    const ramenImages = document.getElementById("ramen-menu");
    const detailRamenName = document.querySelector('.name');
    const detailRamenIMG = document.querySelector('.detail-image');
    const detailRamenRest = document.querySelector('.restaurant');
    const detailRamenRaiting = document.getElementById("rating-display");
    const detailRamenComment = document.getElementById("comment-display");
    const formNewRamen = document.getElementById("new-ramen")
    const formEditRamen = document.getElementById("edit-ramen")
    const deleteBTN = document.getElementById("btn");

    let currentID = 0;


    fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(data => {
        data.forEach(ramen => {
            showallramens(ramen);
        });
        showfrontramen(data[0])
    });

    function showallramens(a) {
        const ramenImageMenus = document.createElement("img");
        ramenImageMenus.src = a.image;
        ramenImages.appendChild(ramenImageMenus);

        ramenImageMenus.addEventListener("click", function() {
            showfrontramen(a);
        });
    }

    function showfrontramen(a) {
        detailRamenIMG.src = a.image
        detailRamenName.textContent = a.name;
        detailRamenRest.textContent = a.restaurant;
        detailRamenRaiting.textContent = a.rating;
        detailRamenComment.textContent = a.comment;
        deleteBTN.textContent = `Delete menu item# :${a.id}`
    }

    formNewRamen.addEventListener('submit', event => {
        event.preventDefault();
        
        const newRamenName = document.getElementById("new-name").value;
        const newRamenImage = document.getElementById("new-image").value;
        const newRamenRest = document.getElementById("new-restaurant").value;
        const newRamenRating = document.getElementById("new-rating").value;
        const newRamenComment = document.getElementById("new-comment").value;

        const newRamenToTheMenu = {
            id:"",
            name: newRamenName,
            restaurant: newRamenRest,
            image: newRamenImage,
            rating: newRamenRating,
            comment: newRamenComment
        };

        newRamenAdd(newRamenToTheMenu);

        fetch("http://localhost:3000/ramens", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRamenToTheMenu)
        })
        .then(response => response.json())
        .then(newlyAddedRamen => {
           
            document.getElementById("new-name").value = '';
            document.getElementById("new-image").value = '';
            document.getElementById("new-restaurant").value = '';
            document.getElementById("new-rating").value = '';
            document.getElementById("new-comment").value = '';
            
            location.reload()

        })
        
    });

    function newRamenAdd(a) {
        const newRamenMenuImg = document.createElement('img');
        newRamenMenuImg.src = a.image;
       
        ramenImages.appendChild(newRamenMenuImg);

    }

    deleteBTN.addEventListener("click", function() {
        let textoconid = deleteBTN.textContent
        let currenID = parseInt(textoconid.substring(19))
        console.log(currenID)

        fetch(`http://localhost:3000/ramens/${currenID}`, {
            method: 'DELETE',
        })
        .then(resp => {
            location.reload()
        })    
    });


    formEditRamen.addEventListener('submit', event => {
        event.preventDefault();

        let textoconid = deleteBTN.textContent
        let currenID = parseInt(textoconid.substring(19))
        console.log(currenID)

        const editRamenRating = document.getElementById("edit-rating").value;
        const editamenComment = document.getElementById("edit-comment").value;

        const updatedRamenData = {
            rating: editRamenRating,
            comment: editamenComment
        };

        fetch(`http://localhost:3000/ramens/${currenID}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRamenData)
        })
        .then(response => {
            location.reload()
        })

    })




