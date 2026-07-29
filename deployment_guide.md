# Deploy VacBrasil Landing Page to Cloudflare Workers

## 1️⃣ Pré‑requisitos
- **Node.js** (versão 18+ recomendada) instalado.
- **npm** disponível no seu PATH.
- Conta no **Cloudflare** e um **Site/Zone** criado (obtenha `ACCOUNT_ID` e `ZONE_ID`).
- **Wrangler** será instalado como dependência do projeto (não precisa instalar globalmente).

## 2️⃣ Instalando dependências
Abra um terminal **CMD** (não PowerShell) dentro da pasta do projeto:
```cmd
cd C:\Users\alex2\.gemini\antigravity\scratch\vacbrasil_landing
npm install
```
> Se o comando falhar por política de execução, use o CMD acima (o PowerShell tem restrição). O log da tarefa será salvo em `C:\Users\alex2\.gemini\antigravity\brain\493c1079-7afc-4c8d-aea8-791b2780ada8\.system_generated\tasks`.

## 3️⃣ Configurando o `wrangler.toml`
Edite **wrangler.toml** e preencha os campos:
```toml
[env.production]
account_id = "<SEU_ACCOUNT_ID>"
zone_id   = "<SEU_ZONE_ID>"
route     = "*"
```
Substitua `<SEU_ACCOUNT_ID>` e `<SEU_ZONE_ID>` pelos valores da sua conta Cloudflare.

## 4️⃣ Publicando
Ainda no terminal, execute:
```cmd
npm run publish
```
Isso compilará o site (não há build complexo, apenas copia os arquivos) e enviará ao Cloudflare Workers.

## 5️⃣ Verificando a implantação
Acesse a URL do seu site (ex.: `https://vacbrasil.org`) – o conteúdo estático será servido a partir do KV store.

## 6️⃣ Imagens incluídas
Os três assets prontos foram copiados para a pasta `public`:
- `high_tech_smartphone.jpg` – hero image
- `person_holding_phone_profit.jpg` – seção de benefícios
- `world_map_data_lines.jpg` – seção de autoridade

> **Observação:** Caso queira substituir alguma imagem, basta substituir o arquivo correspondente dentro de `public/` e republish.

---
### Próximos passos (opcional)
- Adicionar um formulário de captura de leads.
- Configurar HTTPS + certificação automática (já vem com Cloudflare).
- Integrar com Stripe ou outro gateway para o checkout.

---
**🚀 Seu site está pronto para ser publicado!**
