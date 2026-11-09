let ModoClaro = document.getElementById("ModoClaro")
let lua = document.getElementById("lua")


ModoClaro.addEventListener("click", function(){

    document.body.classList.toggle("claro");
    lua.classList.toggle("claro")

})




const fileInput = document.getElementById('fileInput');
        const avatarPreview = document.getElementById('avatarPreview');
        const defaultIcon = document.getElementById('defaultIcon');

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            
            if (file) {
                // Cria um link temporário para o arquivo carregado
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Define o link gerado como fonte da imagem
                    avatarPreview.src = e.target.result;
                    
                    // Mostra a imagem e esconde o ícone de boneco padrão
                    avatarPreview.style.display = 'block';
                    defaultIcon.style.display = 'none';
                }
                
                reader.readAsDataURL(file);
            }
        });



       // Função de máscara do telefone fornecida no seu exemplo
       function mascara_telefone() {
        var tel = document.getElementById("telefone").value;
        tel = tel.slice(0, 14); 
        document.getElementById("telefone").value = tel;
        
        var tel_formatado = document.getElementById("telefone").value;
        if (tel_formatado[0] != "(") {
            if (tel_formatado[0] != undefined) {
                document.getElementById("telefone").value = "(" + tel_formatado[0];
            }
        }
        if (tel_formatado[3] != ")") {
            if (tel_formatado[3] != undefined) {
                document.getElementById("telefone").value = tel_formatado.slice(0, 3) + ")" + tel_formatado[3];
            }
        }
        if (tel_formatado[9] != "-") {
            if (tel_formatado[9] != undefined) {
                document.getElementById("telefone").value = tel_formatado.slice(0, 9) + "-" + tel_formatado[9];
            }
        }
    }

    // Função extra para aplicar máscara simples na Data de Nascimento (DD/MM/AAAA)
    function mascara_data() {
        var dataInput = document.getElementById("nascimento");
        var valor = dataInput.value.replace(/\D/g, ""); // Remove o que não for dígito
        
        if (valor.length > 2 && valor.length <= 4) {
            dataInput.value = valor.slice(0, 2) + "/" + valor.slice(2);
        } else if (valor.length > 4) {
            dataInput.value = valor.slice(0, 2) + "/" + valor.slice(2, 4) + "/" + valor.slice(4, 8);
        } else {
            dataInput.value = valor;
        }
    }

    // Validação obrigatória de e-mail do Gmail ao enviar
    document.getElementById('meuFormulario').addEventListener('submit', function(event) {
        const inputEmail = document.getElementById('email');
        
        if (!inputEmail.value.endsWith('@gmail.com')) {
            event.preventDefault(); 
            alert('Erro: É necessário utilizar um e-mail do Gmail (@gmail.com).');
            inputEmail.focus();
        }
    });











    const lerLS = (k, padrao) => {
        try { return JSON.parse(localStorage.getItem(k)) ?? padrao; } catch { return padrao; }
      };
      const gravarLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));
      const brl = n => n.toFixed(2).replace(".", ",") + " R$";
      
      function pegarCarrinho() { return lerLS("carrinho", []); }
      
      function atualizarBadge(pulsar) {
        const badge = document.getElementById("carrinho-badge");
        if (!badge) return;
        const total = pegarCarrinho().reduce((s, i) => s + i.qtd, 0);
        badge.textContent = total;
        badge.hidden = total === 0;
        if (pulsar) {
          badge.classList.remove("pulse");
          void badge.offsetWidth;
          badge.classList.add("pulse");
        }
      }
      
      function toast(msg) {
        const t = document.createElement("div");
        t.className = "toast";
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2200);
      }
      
      function baixarJSON(obj, nomeArquivo) {
        const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = nomeArquivo;
        a.click();
        URL.revokeObjectURL(a.href);
      }
      
      document.addEventListener("DOMContentLoaded", () => atualizarBadge(false));
      