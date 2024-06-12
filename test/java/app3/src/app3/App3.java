package app3;


import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import org.json.simple.JSONObject;

public class App3 {

    public static void main(String[] args) {
        try {
            // URL da sua API
            String url = "http://localhost:3000/noticias";

            // Dados da notícia
            JSONObject dadosNoticia = new JSONObject();
            dadosNoticia.put("titulo", "Título da Notícia");
            dadosNoticia.put("subtitulo", "Subtítulo da Notícia");
            dadosNoticia.put("data", "2024-02-12");
            dadosNoticia.put("descricao", "Descrição da Notícia");
            dadosNoticia.put("categoria", "Electronica");
            dadosNoticia.put("fonte", "Design");

            // Ler a imagem como um array de bytes
            File imagemArquivo = new File("src/app3/teste.jpg");
            byte[] imagemBytes = new byte[(int) imagemArquivo.length()];
            FileInputStream fileInputStream = new FileInputStream(imagemArquivo);
            fileInputStream.read(imagemBytes);
            fileInputStream.close();

            // Configurar a conexão HTTP
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            String boundary = "----Boundary";
            con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

            // Construir o corpo da solicitação
            try (OutputStream os = con.getOutputStream()) {
                // Adicionar os dados da notícia
                os.write(("--" + boundary + "\r\n").getBytes(StandardCharsets.UTF_8));
                os.write(("Content-Disposition: form-data; name=\"dados_noticia\"\r\n").getBytes(StandardCharsets.UTF_8));
                os.write("Content-Type: application/json\r\n\r\n".getBytes(StandardCharsets.UTF_8));
                os.write(dadosNoticia.toString().getBytes(StandardCharsets.UTF_8));
                os.write(("\r\n--" + boundary + "\r\n").getBytes(StandardCharsets.UTF_8));

                // Adicionar a imagem
                os.write(("Content-Disposition: form-data; name=\"foto\"; filename=\"teste.jpg\"\r\n").getBytes(StandardCharsets.UTF_8));
                os.write("Content-Type: image/jpeg\r\n\r\n".getBytes(StandardCharsets.UTF_8));
                os.write(imagemBytes);
                os.write(("\r\n--" + boundary + "--\r\n").getBytes(StandardCharsets.UTF_8));
            }

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

