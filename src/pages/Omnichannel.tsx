import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Search, Send, Paperclip, Mic, Instagram, MessageCircle, Bell } from "lucide-react";
import { Channel } from "@/types/supabase";
// Removido import do DashboardLayout para evitar duplicação

interface Conversation {
  id: string;
  client: {
    id: string;
    name: string;
    avatar?: string;
  };
  last_message: string;
  last_channel: Channel;
  timestamp: string;
  unread: boolean;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  channel: Channel;
  direction: 'inbound' | 'outbound';
  sender: {
    name: string;
    avatar?: string;
  };
}

export default function OmnichannelPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      client: {
        id: "1",
        name: "João Silva",
        avatar: "https://github.com/shadcn.png",
      },
      last_message: "Olá, gostaria de agendar uma consulta",
      last_channel: "whatsapp",
      timestamp: "10:30",
      unread: true,
    },
    {
      id: "2",
      client: {
        id: "2",
        name: "Maria Santos",
        avatar: "https://github.com/shadcn.png",
      },
      last_message: "Qual o horário de funcionamento?",
      last_channel: "instagram",
      timestamp: "09:45",
      unread: false,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá, gostaria de agendar uma consulta",
      timestamp: "10:30",
      channel: "whatsapp",
      direction: "inbound",
      sender: {
        name: "João Silva",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      id: "2",
      content: "Claro! Posso te ajudar com isso. Qual especialidade você procura?",
      timestamp: "10:31",
      channel: "whatsapp",
      direction: "outbound",
      sender: {
        name: "Atendente",
        avatar: "https://github.com/shadcn.png",
      },
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const conversation = conversations.find(c => c.id === selectedConversation);
    if (!conversation) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: conversation.last_channel,
      direction: 'outbound',
      sender: {
        name: "Atendente",
        avatar: "https://github.com/shadcn.png",
      },
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  return (
    <>
      {/* Removido DashboardLayout para evitar duplicação */}

      {/* Content */}
      <div className="flex-1 bg-background">
        <ResizablePanelGroup direction="horizontal">
          {/* Lista de Conversas */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full flex flex-col border-r">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold mb-4">Conversas</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar conversa..."
                    className="pl-9"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 text-left hover:bg-accent transition-colors ${
                      selectedConversation === conversation.id ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.client.avatar} />
                        <AvatarFallback>{conversation.client.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{conversation.client.name}</CardTitle>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {conversation.last_channel === "instagram" ? (
                            <Instagram className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <MessageCircle className="h-3 w-3 text-muted-foreground" />
                          )}
                          <CardDescription className="text-xs truncate">
                            {conversation.last_message}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Área de Chat */}
          <ResizablePanel defaultSize={75}>
            {selectedConversation ? (
              <div className="h-full flex flex-col">
                {/* Cabeçalho do Chat */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversations.find(c => c.id === selectedConversation)?.client.avatar} />
                      <AvatarFallback>
                        {conversations.find(c => c.id === selectedConversation)?.client.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm">
                        {conversations.find(c => c.id === selectedConversation)?.client.name}
                      </CardTitle>
                      <CardDescription className="text-xs">Online</CardDescription>
                    </div>
                  </div>
                </div>

                {/* Mensagens */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.direction === "outbound" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-2 max-w-[70%] ${
                            message.direction === "outbound" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.sender.avatar} />
                            <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${
                              message.direction === "outbound"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs opacity-70">{message.timestamp}</span>
                              {message.channel === "instagram" ? (
                                <Instagram className="h-3 w-3 opacity-70" />
                              ) : (
                                <MessageCircle className="h-3 w-3 opacity-70" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input de Mensagem */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button onClick={handleSendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <Card className="w-[400px] p-6">
                  <CardTitle className="text-center mb-2">Bem-vindo ao Omnichannel</CardTitle>
                  <CardDescription className="text-center">
                    Selecione uma conversa para começar o atendimento
                  </CardDescription>
                </Card>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}