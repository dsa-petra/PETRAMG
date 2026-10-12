import { supabase } from './supabaseClient.js';

export async function processarLogin(pinDigitado) {
    try {
        // 1. Vai à tabela tb_operadores e procura quem tem a senha igual ao PIN digitado
        const { data: operador, error } = await supabase
            .from('tb_operadores')
            .select('matricula_operador, nome_operador, perfil_acesso, ativo')
            .eq('senha_hash', pinDigitado)
            .single();

        // 2. Se houver erro ou não encontrar ninguém com esse PIN
        if (error || !operador) {
            console.warn("Erro ao buscar operador:", error);
            return { sucesso: false, mensagem: "PIN não encontrado." };
        }

        // 3. Verifica se o operador está inativo/bloqueado
        if (operador.ativo === false) {
            return { sucesso: false, mensagem: "Operador inativo." };
        }

        // 4. Se chegou aqui, o PIN está certo! Guarda os dados para usar no modo offline
        localStorage.setItem('rdo_sessao_atual', JSON.stringify(operador));

        // 5. Encaminha para a tela certa dependendo do perfil
        const perfil = operador.perfil_acesso.toLowerCase();
        
        if (perfil === 'manutencao') {
            window.location.href = "/check_list_pr_operacional.html";
        } 
        else if (perfil === 'operador') {
            window.location.href = "/apontamento_basculante_ut_34.html"; 
        } 
        else if (perfil === 'gestao' || perfil === 'admin' || perfil === 'supervisor') {
            window.location.href = "/tela_hub_central.html";
        } 
        else {
            return { sucesso: false, mensagem: "Perfil desconhecido." };
        }

        return { sucesso: true };

    } catch (err) {
        console.error("Falha de conexão:", err);
        return { sucesso: false, mensagem: "Erro de rede. Verifique a internet." };
    }
}