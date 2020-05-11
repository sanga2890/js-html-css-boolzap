// Mi aggancio a tutti i <p> con classe last-message e aggiungo la stessa frase per ciascuno;
$('.contact-chat-left p.last-message').append('blblablbllbalallaballabla')

// Mi aggancio a tutti i <p> con classe time, figli del <div> con classe contact-chat-right e aggiungo lo stesso contenuto per ciascuno;
$('.contact-chat-right p.time').append('Never')

// faccio in modo che quando premo qualsiasi tasto all'interno dell'input, l'icona del microfono venga sostituita con quella della freccia di invio messaggio;
$('#input-utente').keypress(function(){
    $('.write-message span.mic').addClass('template');
    $('.write-message span.send').removeClass('template');
})

// aggancio il click all'icona di invio messaggio;
$('.write-message span.send').click(function(){
    send_message();
    // faccio quindi ritornare l'icona del microfono;
    mic_active()
})

// aggancio il tasto enter della testiera e gli faccio eseguire la funzione per inviare il messaggio se premuto;
$('#input-utente').keypress(function (e) {
  if (e.which == 13)  {
      send_message();
      // faccio quindi ritornare l'icona del microfono;
      mic_active();
  }
});

// se clicco in un qualsiali punto esterno all'input faccio ricomparire l'icona del microfono al posto di quella di invio;
$(document).click(function(event){
    var target = $(event.target);
    if (!target.hasClass('input')) {
        // faccio quindi ricomparire l'icona del microfono;
        mic_active();
    }
})

function mic_active(){
    $('.write-message span.mic').removeClass('template');
    $('.write-message span.send').addClass('template');
}

// dichiaro la funzione per inviare il messaggio
function send_message(){
    // vado a leggere il testo inserito nell'input e lo salvo con .val;
    var insert_text = $('#input-utente').val();
    // clono il template inserito per avere già la nuvoletta del messaggio stilata;
    var new_message = $('.template .my-message').clone();
    // vado a cercare l'elemento a cui voglio aggiungere il testo inserito e lo aggiungo con il .text;
    new_message.find('p.mex').text(insert_text);
    // faccio la stessa cosa con l'orario;
    new_message.find('p.time').text('0.00');
    // vado infine a scrivere il messaggio all'interno del div con id conversation;
    $('#conversation').append(new_message);
    // svuoto l'input per poter inserire un nuovo messaggio senza dover cancellare il precedente;
    $('#input-utente[placeholder]').val(' ')
}
