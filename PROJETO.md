## Visão geral

Aplicação web de painel (dashboard) multi-tenant para clínicas de estética, com gestão de clientes, agenda, atendimento omnicanal e configurações administrativas. O projeto hoje é um frontend React (Vite + TypeScript) com UI baseada em Tailwind e shadcn-ui. Há um modelo de dados SQL proposto em `modelo.db.md` para implementação de backend futuramente.

### Objetivo
- **Administrar clínicas**: cadastros, usuários e preferências por clínica (tenant).
- **Gestão de clientes**: lista, perfil e histórico.
- **Agendamentos**: visão de calendário e lista do dia.
- **Atendimento**: interface de chat omnicanal (mock) para interações com clientes.
- **Assinatura/Pagamentos**: exibição de status do plano (mock) e ações.

### Público-alvo
- Donos, administradores e equipe (profissionais/recepção) de clínicas de estética.

## Stack e bibliotecas
- **Build/Dev**: Vite (`vite.config.ts`), TypeScript.
- **UI/Design**: Tailwind CSS (`tailwind.config.ts`, `src/index.css`), shadcn-ui/Radix, `lucide-react` ícones.
- **Roteamento**: `react-router-dom`.
- **Estado assíncrono**: `@tanstack/react-query` (provisionado, sem chamadas a API ainda).
- **Formulários/validação**: `react-hook-form`, `zod` (ainda não utilizados nas telas mock).
- **Notificações**: componentes `toast`/`toaster` (shadcn) e `sonner`.
- **Qualidade**: ESLint com presets React/TS (`eslint.config.js`).

## Estrutura de pastas (resumo)
- `src/`
  - `main.tsx`: bootstrap do React.
  - `App.tsx`: providers (QueryClient, Tooltip), toasters e `BrowserRouter` com rotas `/` e catch-all `*`.
  - `pages/`
    - `Index.tsx`: tela principal com layout de sidebar e páginas internas (Dashboard, Agendamentos, Clientes, Atendimento, Configurações, Ajuda), controladas por estado local.
    - `NotFound.tsx`: página 404 simples.
  - `components/ui/`: biblioteca shadcn-ui gerada (e.g., `button.tsx`, `tooltip.tsx`, `toaster.tsx`, etc.).
  - `hooks/`: `use-toast` (gerenciador de toasts) e `use-mobile` (detecção de breakpoint).
  - `lib/utils.ts`: utilitário `cn` para classes.
- `public/`: assets base (`favicon.ico`, etc.).
- `index.html`: HTML host do Vite.
- `modelo.db.md`: proposta de esquema SQL multi-tenant.

## Rotas e navegação
- Definidas em `App.tsx`:
  - `/` → `Index` (contém o layout + páginas internas trocadas por estado: não muda a URL por link da sidebar).
  - `*` → `NotFound`.

Observação: A sidebar dentro de `Index.tsx` troca a "página" pelo estado `currentPage`. Caso desejado, pode ser evoluído para rotas reais (e.g., `/appointments`, `/clients`).

## Telas e funcionalidades atuais (mock)
- **Dashboard**: cartões resumo, ações rápidas e seção "Funcionalidades Futuras".
- **Agendamentos**: área de calendário (mock) e lista de atendimentos do dia.
- **Clientes**: tabela com clientes mock; ao selecionar, exibe perfil com insights e recomendações (mock), histórico e ações.
- **Atendimento (Omnichannel)**: lista de conversas, área de chat e painel lateral com informações do cliente (mock de canais como WhatsApp/Email/Instagram).
- **Configurações**: preferências gerais (logo, nome, horários, contato), gestão de usuários (mock) e seção de assinatura/pagamentos (mock).
- **Ajuda**: central de ajuda com cards.
- **404**: página simples com link para Home.

## Design System
- Definições em `src/index.css` usando CSS variables em HSL:
  - **Cores base**: `--background`, `--foreground`, `--primary`, `--secondary`, etc.
  - **Cores do tema da clínica**: `--clinic-blue`, `--clinic-green`, `--clinic-purple`, `--clinic-orange`, `--clinic-yellow`, `--clinic-red`.
  - **Gradientes**: `--gradient-primary`, `--gradient-card`.
  - **Sombras**: `--shadow-soft`, `--shadow-medium`, `--shadow-large`.
  - **Sidebar**: tokens específicos (`--sidebar-*`).
- Tailwind configurado em `tailwind.config.ts` com `darkMode: class`, paths `./src/**/*.{ts,tsx}` e extensões (cores, animações, radius, etc.).

## Integração de dados (futuro)
O arquivo `modelo.db.md` descreve um esquema SQL para um backend multi-tenant. Resumo:

### ENUMs
- `company_status`: `active`, `inactive`.
- `user_role`: `admin`, `staff`.
- `user_status`: `active`, `inactive`.
- `appointment_status`: `scheduled`, `confirmed`, `completed`, `cancelled`.
- `interaction_channel`: `whatsapp`, `email`, `sms`.
- `interaction_direction`: `inbound`, `outbound`.
- `interaction_status`: `sent`, `delivered`, `read`, `failed`.
- `engagement_level`: `high`, `medium`, `low`.
- `payment_status_company`: `active`, `pending`, `overdue`.
- `payment_method`: `credit_card`, `debit_card`, `cash`, `pix`, `bank_transfer`, `other`.
- `payment_status_transaction`: `paid`, `pending`, `refunded`, `failed`.

### Tabelas principais
- `companies`: clínicas (tenant), status, contato, CNPJ, logo.
- `users`: usuários vinculados a `company_id`, com `role` e `status`.
- `clients`: pacientes por clínica, dados pessoais e `cpf`.
- `services`: serviços da clínica (nome, preço, duração, status).
- `appointments`: agendamentos, vinculando `company`, `client`, `user` e `service`, com `status`.
- `interactions`: interações de comunicação (canal, direção, status, timestamp).
- `insights`: análises do agente (risk_score, engagement_level, resumo e recomendações).
- `payments`: transações financeiras (método, status, valor, transaction_id, vínculo opcional a `appointment`).
- `settings`: preferências por clínica (horários, contatos, suporte, status de pagamento do plano).

Recomendações futuras:
- Implementar autenticação multi-tenant (e.g., por `company_id` no token) e RLS caso use Postgres.
- Expor API REST/GraphQL para integrar as telas (React Query).

## Scripts e execução
- `npm run dev`: inicia servidor Vite em `http://localhost:8080` (vide `vite.config.ts`).
- `npm run build`: build de produção.
- `npm run preview`: pré-visualização do build.
- `npm run lint`: lint do projeto.

Exemplo (terminal):

```sh
npm i
npm run dev
```

## Padrões e utilitários
- `hooks/use-mobile`: utilitário para detectar viewport mobile (< 768px).
- `hooks/use-toast` e `components/ui/toaster`: sistema de toasts shadcn (controlado em memória).
- `lib/utils.ts`: `cn` para merge de classes.

## Roadmap técnico sugerido
- Rotas reais por página (substituir estado local por `react-router-dom`).
- Integração com backend (ex.: Supabase/Node API) usando React Query.
- Autenticação/Autorização com papéis (`user_role`) e segregação por `company_id`.
- Implementar formulários com `react-hook-form` + `zod` para validação.
- Persistência e busca (clientes, agendamentos) com paginação e filtros.
- Webhooks/integrations para canais (WhatsApp/Email/SMS) na área de Atendimento.
- Telemetria e logs (Sentry/Analytics) e testes E2E/Unit.

## Deploy
- Projeto foi iniciado via Lovable. Publicação pode ser feita pela plataforma ou via hospedagem estática (Vercel/Netlify/etc.).

## Licença
Definir licença do projeto conforme a necessidade (não especificada até o momento).


