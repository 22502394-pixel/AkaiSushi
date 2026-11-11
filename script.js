document.addEventListener("DOMContentLoaded", () => {
    const botaoModo = document.getElementById("ModoClaro");
    const lua = document.getElementById("lua");
    const body = document.body;

    const modoSalvo = localStorage.getItem("tema");
    if (modoSalvo === "claro") {
        body.classList.add("claro");
        if (lua) lua.classList.add("claro");
    }

    if (botaoModo) {
        botaoModo.addEventListener("click", () => {
            body.classList.toggle("claro");
            if (lua) lua.classList.toggle("claro");

            if (body.classList.contains("claro")) {
                localStorage.setItem("tema", "claro");
            } else {
                localStorage.setItem("tema", "escuro");
            }
        });
    }

    const fileInput = document.getElementById('fileInput');
    const avatarPreview = document.getElementById('avatarPreview');
    const defaultIcon = document.getElementById('defaultIcon');

    if (fileInput && avatarPreview && defaultIcon) {
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                    avatarPreview.style.display = 'block';
                    defaultIcon.style.display = 'none';
                }
                reader.readAsDataURL(file);
            }
        });
    }

    const meuFormulario = document.getElementById('meuFormulario');
    if (meuFormulario) {
        meuFormulario.addEventListener('submit', function(event) {
            const inputEmail = document.getElementById('email');
            if (inputEmail && !inputEmail.value.endsWith('@gmail.com')) {
                event.preventDefault(); 
                alert('Erro: É necessário utilizar um e-mail do Gmail (@gmail.com).');
                inputEmail.focus();
            }
        });
    }

    const inputTelefone = document.getElementById("telefone");
    if (inputTelefone) {
        inputTelefone.addEventListener("input", mascara_telefone);
    }

    const inputNascimento = document.getElementById("nascimento");
    if (inputNascimento) {
        inputNascimento.addEventListener("input", mascara_data);
    }

    atualizarBadge(false);
});

function mascara_telefone() {
    var telInput = document.getElementById("telefone");
    var tel = telInput.value.slice(0, 14); 
    telInput.value = tel;
    
    var tel_formatado = telInput.value;
    if (tel_formatado[0] != "(" && tel_formatado[0] != undefined) {
        telInput.value = "(" + tel_formatado[0];
    }
    if (tel_formatado[3] != ")" && tel_formatado[3] != undefined) {
        telInput.value = tel_formatado.slice(0, 3) + ")" + tel_formatado[3];
    }
    if (tel_formatado[9] != "-" && tel_formatado[9] != undefined) {
        telInput.value = tel_formatado.slice(0, 9) + "-" + tel_formatado[9];
    }
}

function mascara_data() {
    var dataInput = document.getElementById("nascimento");
    var valor = dataInput.value.replace(/\D/g, "");
    
    if (valor.length > 2 && valor.length <= 4) {
        dataInput.value = valor.slice(0, 2) + "/" + valor.slice(2);
    } else if (valor.length > 4) {
        dataInput.value = valor.slice(0, 2) + "/" + valor.slice(2, 4) + "/" + valor.slice(4, 8);
    } else {
        dataInput.value = valor;
    }
}

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
