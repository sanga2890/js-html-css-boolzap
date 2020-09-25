// Mi aggancio a tutti i <p> con classe last-message e aggiungo la stessa frase per ciascuno;
$('.contact-chat-left p.last-message').append('<span class="material-icons">done_all</span>' + 'blablablablalalbblal');

// Mi aggancio a tutti i <p> con classe time, figli del <div> con classe contact-chat-right e aggiungo lo stesso contenuto per ciascuno;
var last_time_message = $("div:last-of-type.your-message .time").text();
$('.contact-chat-right p.time').append(last_time_message);

// faccio in modo che quando premo qualsiasi tasto all'interno dell'input, l'icona del microfono venga sostituita con quella della freccia di invio messaggio;
$('#input-utente').keyup(function(){
    $('.write-message span.mic').addClass('hide');
    $('.write-message span.send').removeClass('hide');
})

// ricavo l'ora attuale per inserirla poi nei messaggi;
// creo una funzione per aggiungere lo zero davanti ai minuti e alle ore se il valore è minore di 10; (Presa e riadattata da W3 schools);
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
var d = new Date();
var h = addZero(d.getHours());
var m = addZero(d.getMinutes());
var time_now = h + ":" + m;


// aggancio il click all'icona di invio messaggio;
$('.write-message span.send').click(function(){
    // aggiungo la funzione per l'invio del mio messaggio;
    send_message();

    // faccio uscire la scritta "sta scrivendo..." finché non avrò effettivamente ricevuto la risposta;
    // la scritta compare nel contatto a sinistra;
    $('.contact-chat.active .contact-chat-left .last-message').text('Sta scrivendo...');
    // la scritta compare nell'header della conversazione;
    $('.header-chat-left.visible .ultimo-accesso').text('Sta scrivendo...')

    // faccio quindi ritornare l'icona del microfono;
    mic_active();

    // sposto il contatto in cima alla lista
    move_up()
})

// aggancio il tasto enter della testiera e gli faccio eseguire la funzione per inviare il messaggio se premuto;
$('#input-utente').keypress(function (e) {
  if (e.which == 13)  {
      // aggiungo la funzione per l'invio del mio messaggio;
      send_message();
      // la scritta compare nel contatto a sinistra;
      $('.contact-chat.active .contact-chat-left .last-message').text('Sta scrivendo...');
      // la scritta compare nell'header della conversazione;
      $('.header-chat-left.visible .ultimo-accesso').text('Sta scrivendo...')

      // faccio quindi ritornare l'icona del microfono;
      mic_active();

      // sposto il contatto in cima alla lista;
      move_up()

  }
});


// se clicco in un qualsiasi punto esterno all'input faccio ricomparire l'icona del microfono al posto di quella di invio;
$(document).click(function(event){
    var target = $(event.target);
    if (!target.hasClass('input')) {
        // faccio quindi ricomparire l'icona del microfono;
        mic_active();
    }
})

// uso il keyup per la ricerca senza dover cliccare;
$('#input-search').keyup(function () {
  //aggiungo funzione per la ricerca;
      search_contact();

});

// LA SEGUENTE FUNZIONE CON IL CLICK SULL'ICONA È ORMAI INUTILE E LA COMMENTO SOLAMENTE;
//
// // mi aggangio al click sull'icona della lente accanto all'input;
// $('.search .material-icons').click(function(){
//     // inserisco la funzione per la ricerca;
//     search_contact();
// })


function mic_active(){
    $('.write-message span.mic').removeClass('hide');
    $('.write-message span.send').addClass('hide');
}

// dichiaro la funzione per inviare il messaggio
function send_message(){
    // vado a leggere il testo inserito nell'input e lo salvo con .val;
    var insert_text = $('#input-utente').val();
    // procedo solo se c'è scritto effettivamente qualcosa nell'input, per evitare di mandare messaggi vuoti;
    if (insert_text.trim() != ''){
        // clono il template inserito per avere già la nuvoletta del messaggio stilata;
        // var new_message = $('.template .my-message').clone();
        var source = $("#my-template").html();
        var template = Handlebars.compile(source);
        var context = {
            'text': insert_text,
            'time':time_now
        }
        var html = template(context);
        $('.conversation.visible').append(html);
        // vado a cercare l'elemento a cui voglio aggiungere il testo inserito e lo aggiungo con il .text;
        // new_message.find('p.mex').text(insert_text);
        // // faccio la stessa cosa con l'orario;
        // new_message.find('p.time').text(time_now);
        // // vado infine a scrivere il messaggio all'interno del div con id conversation;
        // $('.conversation.visible').append(new_message);
        // svuoto l'input per poter inserire un nuovo messaggio senza dover cancellare il precedente;
        $('#input-utente[placeholder]').val('')
        // aggiungo la fuzione per lo scroll automatico;
        auto_scroll()
        // aggiungo la funzione per il ricevimento ritardato del messaggio di risposta;
        message_received();
        // aggiungo la funzione per leggere l'ora dell'ultimo messaggio;
        last_time()
    }

}

// creo funzione per ricevere un messaggio di risposta automatico;
function message_received(){
        // dichiaro variabile time e creo la funzione per la risposta posticipata di 1 secondo;
    var time = setInterval(answer_received, 1000);
    function answer_received(){
        // inserisco quindi un testo a caso nella variabile messagge;
        var message = 'Tutto ooook!!!!!';
        // clono il template con lo style della nuvoletta di messaggio di risposta;
        // utilizzo handlebars per generare templates;
        var source = $('#your-template').html();
        var template = Handlebars.compile(source);
        var context = {
            'text': message,
            'time': time_now
        }
        var html = template(context);
        $('.conversation.visible').append(html);
        // var new_message = $('.template .your-message').clone();
        // // cerco l'elemento in cui voglio aggiungere il mesasggio e lo aggiungo;
        // new_message.find('p.mex').text(message);
        // // faccio la stessa cosa con l'orario;
        // new_message.find('p.time').text(time_now);
        // // vado infine a scrivere il messaggio all'interno del div con id conversation;
        // $('.conversation.visible').append(new_message);
        // aggiungo la funzione per leggere l'ultimo messaggio ricevuto;
        last_message_received()
        // interrompo infine il timer per evitare che ogni secondo mi inserisca automaticamente una nuova risposta;
        clearInterval(time);
        // inserisco la funzione per lo scroll automatico;
        auto_scroll()
        // faccio ricomparire la scritta con l'ultimo accesso "fittizio" dopo che era stata sostituita dalla scritta "Sta scrivendo..."
        $('.header-chat-left.visible .ultimo-accesso').text('Ultimo accesso oggi alle fatti i *azzi tua')
    }
}

// ricerca dei nomi dei contatti dall'input dell'aside di sinistra.

// creo una funzione per la ricerca;
function search_contact(){
    var input_search = $('#input-search').val().trim().toLowerCase();
    // creo una condizone per cui se l'input resta vuoto, cliccando sull'icona ricompaiono tutti i contatti, altrimenti procedo con la ricerca;
    if (input_search != '') {
        // controllo ogni elemento con il nome dell'utente e lo paragono al testo inserito nell'input;
        $('.contact-chat').each(function(){
            var name = $(this).find('.contact-name').text().toLowerCase();
            // se le due stringhe combaciano allora metto il display block all'elemento con il testo uguale;
            if (name.includes(input_search)) {
                $(this).show();
                // metto invece a tutti gli altri elementi con testo diverso il display none, risalendo fino al padre contenitore opportuno, grazie al method closest();
            } else {
                $(this).hide();
            }
        })
    // se l'input è vuoto rimetto il display block a tutti i contatti;
    } else {
        $('.contact-chat').show();
    }
}

// icona della freccia azzurra che, quando clicco sulla barra di ricerca per cercare un contatto, prenderà il posto dell'icona della lente;
$('#input-search').click(function(){
    $('.search .material-icons.cerca').addClass('hide');
    var ruota = $('.search .material-icons.arrow-down').removeClass('hide')
    // mantiene la freccia ruotata di 90 gradi;
    $(ruota).css("transform", "rotate(90deg)");
})

// Intercetto il click sull'icona della freccia e svuoto l'input e faccio riapparire tutti i contatti;
$('.search .material-icons.arrow-down').click(function(){
    $('#input-search').val('');
    $(this).addClass('hide');
    $('.search .material-icons.cerca').removeClass('hide');
    $('.contact-chat').show();
})


// devo abbinare il click sul contatto a sinistra con la conversazione corrispondente. Quindi togliere la conversazione precendente  e sostituirla con quella che corrisponde al contatto selezionato;

// abbino il click al contatto;
$('.contact-chat').click(function(){
    $('.header-chat, .write-message').removeClass('hide');
    $('.contact-chat').removeClass('active');
    $(this).addClass('active');
    // aggiungo subito la classe con il display none a tutte le conversation per resettare ad ogni click;
    $('.conversation').addClass('hide').removeClass('visible');
    // faccio lo stesso con l'header left della chat;
    $('.header-chat-left').addClass('hide').removeClass('visible');

    // cerco l'elemento che contiene il nome del contatto e lo salvo in una variabile;
    var name = $(this).find('p.contact-name').text();
    // recupero il suo corrispondente e rimuovo il display block;
        $('.conversation[data-contact-name="' + name + '"]').removeClass('hide').addClass('visible');
        // idem per l'header left della chat;
        // sostituisco l'immagine e il nome con il suo corrispondente;
        $('.header-chat-left[data-header-chat="' + name + '"]').removeClass('hide').addClass('visible');

})

// creo dropdown per eliminare il messaggio corrispondente;
// aggancio il click sull'icona della freccia in giù;
// uso il method on click per tenere sempre in ascolto il selettore indicato e far eseguire la stessa funzione anche ai nuovi messaggi inseriti;
$('.conversation').on('click', 'p.arrow', function(){
    // selezione l'elemento successivo e alterno la classe hide;
    $(this).next().toggleClass('hide')
})

// aggancio il click al dom tranne per le classi escluse e nascondo il dropdown cliccando su qualsiasi altro punto della pagina;
$(document).click(function(event){
    var target = $(event.target);
    if (!target.hasClass('fas') && !target.hasClass('dropdown') && !target.hasClass('info')) {
        $('.dropdown').addClass('hide');
    }
})

// aggancio il clik alla stringa con classe .delete, sempre con on click, per intercettare anche i nuovi messaggi;
$('.conversation').on('click', 'p.delete', function(){
    // recupero il padre e ricerco l'elemento con la classe .mex, sostituisco il il messaggio prima con una stringa vuota e poi ci appendo l'icona di divieto più il testo che indica che il messaggio è stato eliminato, correttamente stilato;
    $(this).closest('.your-message').find('.mex').text('').append('<span class="material-icons">block</span>' + 'Questo messaggio è stato eliminato').css({"font-style": "italic" , "color":"#919191"});
    $(this).closest('.my-message').find('.mex').text('').append('<span class="material-icons">block</span>' + 'Questo messaggio è stato eliminato').css({"font-style": "italic" , "color":"#919191"});
    // elimino infine la possibilità di richiamare il dropdown, ormai inutile dopo la cancellazione del messaggio;
    $(this).closest('.dropdown').remove();
})

// scroll della conversazione automatico;
function auto_scroll() {
        $(".conversation.visible").scrollTop($(".conversation.visible")[0].scrollHeight);
    }

// funzione per inserire l'orario dell'ultimo messaggio nel contatto corrispondente della lista;
function last_time() {
    var last_time = $(".conversation.visible div:last-child.my-message .time").text();
    $('.contact-chat.active .contact-chat-right .time').text(last_time);
}

// funzione per inserire l'ultimo messaggio ricevuto nel contatto corrispondente della lista;
function last_message_received() {
    var last_answer = $('.conversation.visible div:last-child.your-message .mex').text();
    $('.contact-chat.active .contact-chat-left .last-message').text(last_answer);
}

// funzione per spostare il contatto alla prima posizione della lista quando inviamo/riceviamo un messaggio da lui;
function move_up() {
    $('.contact-chat.active').insertBefore('.contact-chat:first-child')
}
