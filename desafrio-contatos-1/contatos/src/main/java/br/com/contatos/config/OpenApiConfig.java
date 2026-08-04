package br.com.contatos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI contatosOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("API de Contatos")
                .description("API para gerenciamento de contatos: criação, listagem, atualização, favoritos e desativação.")
                .version("v1"));
    }
}
