var productImages=['bag.jpg','banana.jpg','boots.jpg','breakfast.jpg',
'bubblegum.jpg','chair.jpg','cthulhu.jpg',
'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg',
'scissors.jpg','shark.jpg','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'
];
var leftProductImage = document.querySelector('#leftimg');
var rightProductImage = document.querySelector('#rightimg');
var centerProductImage = document.querySelector('#centerimg');
var groupImageSection = document.getElementById('all-Product');
var product=[];
var totalClicks = 1

// function Products(name){
// this.name = name;
// this.urlImg = `img/${this.name}`;
// this.totalViews = 0;
// this.totalVotes = 0 ;
// product.push(this);

// }

function choiseRandomImage(){
    var leftImageRandom = product[randomNumber(0,product.length - 1)]
    var rightImageRandom = product[randomNumber(0,product.length - 1)]
    var centerImageRandom = product[randomNumber(0,product.length - 1)]
    leftProductImage.setAttribute('src' , leftImageRandom.urlImg);
    leftProductImage.setAttribute('alt' , leftImageRandom.name);
    rightProductImage.setAttribute('src' , rightImageRandom.urlImg);
    rightProductImage.setAttribute('alt' ,rightImageRandom.name);
    centerProductImage.setAttribute('src' , centerImageRandom.urlImg);
    centerProductImage.setAttribute('alt' ,centerImageRandom.name);
  while((leftImageRandom.name === rightImageRandom.name)||(leftImageRandom.name === centerImageRandom.name)||(centerImageRandom.name === rightImageRandom.name)){
    var leftImageRandom = product[randomNumber(0,product.length- 1)]
    var rightImageRandom = product[randomNumber(0,product.length- 1)]
    var centerImageRandom = product[randomNumber(0,product.length- 1)]
    leftProductImage.setAttribute('src' , leftImageRandom.urlImg);
    leftProductImage.setAttribute('alt' , leftImageRandom.name);
    rightProductImage.setAttribute('src' , rightImageRandom.urlImg);
    rightProductImage.setAttribute('alt' ,rightImageRandom.name);
    centerProductImage.setAttribute('src' , centerImageRandom.urlImg);
    centerProductImage.setAttribute('alt' ,centerImageRandom.name);
  }
  leftImageRandom.totalVotes += 1;
  rightImageRandom.totalVotes += 1;
  centerImageRandom.totalVotes += 1;
}
for(var i = 0; i<productImages.length;i++ ){
  new Products(productImages[i]); 
}
choiseRandomImage();
console.log(product);
function clickImage(e){
  for (var i = 0 ; i <product.length ; i++){
    if (product[i].name === e.target.alt){
      product[i].totalViews += 1;
      setItem()
    }  
  }
  if((e.target.id ==='leftimg')||(e.target.id ==='rightimg')||(e.target.id ==='centerimg')){
    choiseRandomImage();
    totalClicks = totalClicks +  1; 
  }
  if(totalClicks ===25){
    groupImageSection.removeEventListener('click' , clickImage)
    leftProductImage.remove();
    rightProductImage.remove();
    centerProductImage.remove();
    randomEnd();
    alert('That was the last choise !')
    renderChartResults();
  }
}

///added Local srorge after the event.
function setItem(){
  var totalViews = JSON.stringify(product);
  localStorage.setItem( 'product', totalViews);
  // update the value
  
}

 function getItem(){

  var totalViews=JSON.parse(localStorage.getItem('product'));
  if(totalViews===null){
   
  }else{
    product = totalViews
  }
  randomEnd();
}





//End the local storage
groupImageSection.addEventListener('click' , clickImage);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomEnd(){
var listEl = document.getElementById("listProduct");
var ulel = document.createElement('ul');
listEl.appendChild(ulel);
for(var i = 0 ; i < product.length ; i ++){
  var liEl = document.createElement('li');
  liEl.textContent = `${product[i].name} had ${product[i].totalViews} votes and was shown ${product[i].totalVotes} times`
  ulel.appendChild(liEl)
}
}


function renderChartResults(){
  var productNames = [];
  var productClicks = [];
  for(var i = 0 ; i < product.length ; i++){
    var productnames = product[i].name;
    productNames.push(productnames);
    var productlicks = product[i].totalViews;
    productClicks.push(productlicks);
  }


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: productNames,
        datasets: [{
            label: '# of Votes',
            data: productClicks,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}

);}
getItem();