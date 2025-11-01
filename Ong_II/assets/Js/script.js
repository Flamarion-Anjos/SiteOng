/* cadastro.html */

    document.getElementById("year").textContent = new Date().getFullYear();

    const form = document.getElementById('cadastroForm');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valido = true;
      let mensagens = [];

      form.querySelectorAll('.erro').forEach(el => el.classList.remove('erro'));

      const campos = [
        'nome','email','cpf','telefone','nascimento',
        'cep','endereco','cidade','estado','interesse','comentario'
      ];

      campos.forEach(id => {
        const campo = document.getElementById(id);
        if(!campo.value.trim()){
          valido = false;
          campo.classList.add('erro');
          mensagens.push(`O campo "${id}" é obrigatório.`);
        }
      });

      const email = document.getElementById('email').value;
      if(email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)){
        valido = false;
        mensagens.push('E-mail inválido.');
      }

      if(!valido){
        feedback.innerHTML = `<div class="alerta-erro"><strong>Corrija os erros:</strong><ul>${mensagens.map(m=>`<li>${m}</li>`).join('')}</ul></div>`;
        feedback.scrollIntoView({behavior:'smooth'});
      } else {
        feedback.innerHTML = `<div class="alerta-sucesso"><strong>Cadastro enviado com sucesso!</strong></div>`;
        form.reset();
      }
    });
  
// --- Máscaras para CPF, Telefone e CEP e armazenamento de usuário ---
(function(){
  function maskCPF(v){ return v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2'); }
  function maskTel(v){ v=v.replace(/\D/g,''); if(v.length>10) return v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3'); return v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3'); }
  function maskCEP(v){ return v.replace(/\D/g,'').replace(/(\d{5})(\d{1,3})/,'$1-$2'); }

  var cpf = document.getElementById('cpf');
  var tel = document.getElementById('telefone');
  var cep = document.getElementById('cep');
  if(cpf) cpf.addEventListener('input', function(e){ e.target.value = maskCPF(e.target.value); });
  if(tel) tel.addEventListener('input', function(e){ e.target.value = maskTel(e.target.value); });
  if(cep) cep.addEventListener('input', function(e){ e.target.value = maskCEP(e.target.value); });

  
  var form = document.getElementById('cadastroForm');
  if(form){
    form.addEventListener('submit', function(e){
      var feedback = document.getElementById('form-feedback');
      var observer = new MutationObserver(function(mutations){
        mutations.forEach(function(m){
          if(m.addedNodes && m.addedNodes.length){
            var added = m.addedNodes[0];
            if(added && added.classList && added.classList.contains('alerta-sucesso')){
              try{
                var nome = document.getElementById('nome').value.trim();
                var email = document.getElementById('email').value.trim();
                var cpfv = document.getElementById('cpf').value.trim();
                var telv = document.getElementById('telefone').value.trim();
                var interesse = document.getElementById('interesse').value;
                var usuarios = JSON.parse(localStorage.getItem('usuarios')||'[]');
                if(!usuarios.some(function(u){ return u.email===email; })){
                  usuarios.push({nome:nome,email:email,cpf:cpfv,telefone:telv,interesse:interesse});
                  localStorage.setItem('usuarios', JSON.stringify(usuarios));
                }
              }catch(err){ console.error(err); }
            }
          }
        });
      });
      if(feedback) observer.observe(feedback, {childList:true});
    });
  }

})();



