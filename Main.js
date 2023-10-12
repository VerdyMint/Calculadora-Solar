if (localStorage.getItem("Custo") == null) {
    console.log("Não há resultados salvos :3")
} else {
    Resultado.style.display = "flex";

    document.getElementById("PotenciaM").innerHTML = "<ds>Olá!</ds> A Placa havia Gerado <ds>"+localStorage.getItem("PotMensal")+"</ds>kW por mês."
    document.getElementById("PlacasN").innerHTML = "Você precisaria de <ds>"+localStorage.getItem("Placas")+"</ds> Placas Solares."
    document.getElementById("AreaN").innerHTML = localStorage.getItem("Placas")+" placas ocupariam <ds>"+localStorage.getItem("Area")+"</ds> Metros Quadrados."
    document.getElementById("Retorno").innerHTML = "Iria demorar <ds>"+localStorage.getItem("Retorno")+"</ds> meses para o Retorno do Investimento."
    document.getElementById("Custo").innerHTML = "O Custo Total foi de <ds>"+localStorage.getItem("Custo")+"</ds> Reais."
}

function Debug() {
    let esp = document.querySelectorAll(".Esp"); 

	for (let i = 0; i < esp.length; i++) {
		esp[i].style.backgroundColor = "var(--cor-contraste)";
        esp[i].style.borderRadius = "10px";
    }
}

function Excluir(it) {
    if (confirm("Deseja excluir?")) {
        localStorage.removeItem(it);
        console.log("Item " + it + " deletado");
    } else {
        console.log("Cancelado");
        return;
    }
}

function Editar(opr,id) { 
    if (opr == "menos") {
        document.getElementById(id).stepDown();
    }

    if (opr == "mais") {
        document.getElementById(id).stepUp();
    }
}

function Calcular() {    
    // Definições de Variáveis
    var ResultadoElemento = document.getElementById("Resultado");

    const PM = {
        // Potência
        P: 0.35,
        // Custo Placa
        CP: 900,
        // Custo Kw
        CKw: 0.73,
        // Custo Instalação
        CI: 3500,
        // Dimenção da Placa
        D: 3,
        // Porcentagem de Horas de Pico
        Pico: 0.5
    }

    var Salvar = document.querySelector("input[name='Salvar']:checked").value;
    var Gasto = parseInt(document.getElementById("Gasto").value);
    var Sol = parseInt(document.getElementById("Sol").value);
    var SolPico = Sol * PM.Pico;

    if (isNaN(Gasto)) {
        alert("Preencha todos os Campos!");
        return;
    }

    console.log("Gasto: " + Gasto);
    console.log("Salvar: " + Salvar);
    console.log("Sol: " + Sol);
    console.log("Sol Pico: " + SolPico)

    Resultado.style.display = "flex";

    var PotMensal = (SolPico * PM.P * 30).toFixed(2);
    var kW = (Gasto / PM.CKw).toFixed(2);
    var PlacasN = Math.round(kW / PotMensal); 
    var AreaN = (PlacasN * PM.D).toFixed(2);
    var CustoT = PM.CI + (PM.CP * PlacasN);
    var Tempo = Math.round(CustoT / Gasto);

    console.group("Resultados:")
    console.log("Potência Mensal: "+ PotMensal)
    console.log("Kilowatts Gasto: " + kW)
    console.log("Placas Nessesárias: " + PlacasN)
    console.log("Área Necessária: " + AreaN)
    console.log("Custo Total: " + CustoT)
    console.log("Tempo: " + Tempo)
    console.groupEnd

    if (Salvar == "Sim") {
        // Local Storage Dump
        {
        localStorage.setItem("PotMensal", PotMensal);
        localStorage.setItem("Placas", PlacasN);
        localStorage.setItem("Area", AreaN);
        localStorage.setItem("Retorno", Tempo);
        localStorage.setItem("Custo", CustoT);
        }
        
        document.getElementById("PotenciaM").innerHTML = "A Placa Irá Gerar <ds>"+PotMensal+"</ds>kW por mês."
        document.getElementById("PlacasN").innerHTML = "Você precisaria de <ds>"+PlacasN+"</ds> Placas Solares."
        document.getElementById("AreaN").innerHTML = PlacasN+" placas ocupariam <ds>"+AreaN+"</ds> Metros Quadrados."
        document.getElementById("Retorno").innerHTML = "Iria demorar <ds>"+Tempo+"</ds> meses para o Retorno do Investimento."
        document.getElementById("Custo").innerHTML = "O Custo Total foi de <ds>"+CustoT+"</ds> Reais."
    }
    if (Salvar == "Nao") {
        document.getElementById("PotenciaM").innerHTML = "A Placa Irá Gerar <ds>"+PotMensal+"</ds>kW por mês."
        document.getElementById("PlacasN").innerHTML = "Você precisaria de <ds>"+PlacasN+"</ds> Placas Solares."
        document.getElementById("AreaN").innerHTML = PlacasN+" placas ocupariam <ds>"+AreaN+"</ds> Metros Quadrados."
        document.getElementById("Retorno").innerHTML = "Iria demorar <ds>"+Tempo+"</ds> meses para o Retorno do Investimento."
        document.getElementById("Custo").innerHTML = "O Custo Total foi de <ds>"+CustoT+"</ds> Reais."
    } 
    if (Salvar == "Baixar") {
        var text = 
        `----- Resultados -----\n\n`+
        `-- Valor Inseridos:\n\n`+
        `- Gasto Mensal: `+Gasto+`R$\n`+
        `- Horas de Sol: `+Sol+` Horas\n`+
        `\n\n`+
        `-- Resultados:\n\n`+
        `- Potência Mensal: `+PotMensal+`kW\n`+
        `- Placas Necessárias: `+PlacasN+`\n`+
        `- Área Necessária: `+AreaN+` Metros Quadrados\n`+
        `- Meses para o Retorno do Investimento: `+Tempo+` Meses.\n`;

        var filename = "Resultados.txt";
        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
        return saveAs(blob, filename);
    }

    window.scrollTo(0, 1100);

}