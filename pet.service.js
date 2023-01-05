

var petList = [];

function createListElement(item, index) {
    return `<li class="list-group-item" data-details="${index}"><img class='image' src=${item.pic}/><div class="details"><p>Name: ${item.name}</p> <p>Age: ${item.age}</p></div></li>`
}

function createPetDetailsElement(item) {
    return `<div class="list-group-item"><img class='image' src=${item.pic}/><div class="details"><p>Name: ${item.name}</p> <p>Age: ${item.age}</p> <p>Gender: ${item.gender}</p> <p>Adoption Fee: ${item.adoptionFee}</p></div></div>`
}

function getPetList(petListGroup) {
    $.get("/pet/list.json", function (data) {
        petList = petList.length ? petList.concat(data) : data;
        petList.forEach((elem, index) => {
            petListGroup.append(createListElement(elem, index));
        })
    }).fail(function (error) {
        console.log(error)
    });
}

function initInfiniteScroll(petListGroup) {
    $(window).scroll(function () {
        if ($(document).height() - $(this).height() == $(this).scrollTop()) {
            getPetList(petListGroup);
        }
    });
}

function bindListItemClickEvent() {
    $('.list-group').on('click', '.list-group-item', function () {
        const index = $(this).attr('data-details');
        openDetailModal(petList[index]);
    })
}


function openDetailModal(item) {
    $('#petModalDetailsBody').html(createPetDetailsElement(item));
    $('#petModal').modal('show');
}