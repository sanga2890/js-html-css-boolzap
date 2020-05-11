// Mi aggancio a tutti i <p> con classe last-message e aggiungo la stessa frase per ciascuno;
$('.contact-chat-left p.last-message').append('blblablbllbalallaballabla')

// Mi aggancio a tutti i <p> con classe time, figli del <div> con classe contact-chat-right e aggiungo lo stesso contenuto per ciascuno;
$('.contact-chat-right p.time').append('Never')

// per il momento aggancio il clic sul microfono come se fosse il tasto invio messaggio e vado a leggere il testo contenuto nell'input con id="input-utente" e lo assegno ad una variabile;
$('.write-message .material-icons').click(function(){
    var insert_text = $('#input-utente').val();
    var new_message = $('.template .my-message').clone();
    new_message.find('p.mex').text(insert_text);
    new_message.find('p.time').text('0.00');
    $('#conversation').append(new_message);
    
})
