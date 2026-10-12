import { supabase } from './supabaseClient.js';

export async function processarLogin(pinDigitado) {
    // Tratamento imediato para área de sombra (offline)
    if (!navigator.onLine) {
        return { sucesso: false, mensagem: "Sem sinal. Aproxime-se de uma área com rede para o acesso." };
    }

    try {
        const { data: operador, error } = await supabase
            .from('tb_operadores')
            .select('matricula_operador, nome_operador, perfil_acesso, ativo')
            .eq('senha_hash', pinDigitado)
            .single();

        if (error || !operador) {
            return { sucesso: false, mensagem: "PIN não reconhecido. Verifique a numeração." };
        }

        if (!operador.ativo) {
            return { sucesso: false, mensagem: "Matrícula inativa. Fale com a supervisão." };
        }

        // Persistência da sessão para uso offline na cava
        localStorage.setItem('operador_atual', JSON.stringify(operador));

        // Roteamento baseado no perfil (direcionando para as tuas telas do Stitch)
        const perfil = operador.perfil_acesso.toLowerCase();
        let destino = "";

        if (perfil === 'manutencao') {
            destino = "/tela_liberacao_oficina.html"; 
        } 
        else if (perfil === 'operacao') {
            destino = "/tela_selecao_equipamento.html"; 
        } 
        else if (perfil === 'gestao' || perfil === 'admin') {
            destino = "/tela_hub_central.html"; 
        } 
        else {
            return { sucesso: false, mensagem: "Perfil sem acesso definido." };
        }

        return { sucesso: true, rota: destino };

    } catch (err) {
        return { sucesso: false, mensagem: "Falha no sistema. Tente novamente." };
    }
}