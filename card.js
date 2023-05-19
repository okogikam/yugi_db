 function cards(card){
            let error = card.error || false;
            let jml = card.data.length || 0;

            if(!error){
                if(jml > 1){
                    for(let x=0;x<jml;x++){
                        let name = card.data[x].name || false;
                        let type = card.data[x].type || false
                        let img = card.data[x].card_images || false;
                        let div = document.createElement("div");
                        div.classList.add("card","d-flex");
                        div.innerHTML = `
                        <a href="?name=${name}">
                        <img class='img-sm' src='${img[0].image_url_small}'>
                        </a>
                        <div class='card-body p-0 m-0'>
                            <p><a href="?name=${name}">${name}</a><br>
                            ${type}</p>
                        </div>
                        `;
        
                       results.append(div);
                    }
                }
                else{
                    onecard(card);
                }
            }
        }

        function onecard(card){
           let error = card.error || false;
           if(!error){
            let c = card.data[0] || false;
            let div = document.createElement("div");
            div.classList.add("card");
            div.classList.add("kartu");
            div.innerHTML = `<div class='card-body'>
            <h3 class='title'>${c.name}</h3>
            <img src='${c.card_images[0].image_url}'>
            <div class='card-detail'>
                <h3 class='title-sm'>${c.name}</h3>
                <p>Tipe: ${c.type} - Level: ${c.level} - Race: ${c.race}</p>
                <p>Diskripsi:<br> ${c.desc}</p>
                <p>Atk: ${c.atk} / Def: ${c.def}</p>
                <p>Card Set:
                    
                </p>
                <p>Card Price:
                    <ol>
                        <li>Card Market: $ ${c.card_prices[0].cardmarket_price}</li>
                        <li>TCG: $ ${c.card_prices[0].tcgplayer_price}</li>
                        <li>Ebay: $ ${c.card_prices[0].ebay_price}</li>
                        <li>Amazon: $ ${c.card_prices[0].amazon_price}</li>
                        <li>Coolstuff: $ ${c.card_prices[0].coolstuffinc_price}</li>
                    </ol>
                </p>
            </div>  
            </div>`;

            one_results.append(div);
           }
        }