package src;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class App {

    public static void main(String[] args) {
        try {
            // URL da API para obter todas as notícias
            String url = "http://localhost:3000/notificacoes/";

            // Configurar a conexão HTTP
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");

            // Obter a resposta
            int responseCode = con.getResponseCode();
            System.out.println("Código de resposta: " + responseCode);

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Exibir a resposta
            System.out.println("Resposta da API:");
            System.out.println(response.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
