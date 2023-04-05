package ibf2022.batch1.csf.assessment.server.util;

import java.io.Reader;
import java.io.StringReader;
import java.util.List;

import org.bson.Document;

import ibf2022.batch1.csf.assessment.server.models.Comment;
import ibf2022.batch1.csf.assessment.server.models.Review;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;

public class Util {

    public static List<Review> parseMovieRespToJson(String responseBody) {
        System.out.println("<<<<<<<<<<<<<< In util converting resp body to json >>>>>>>>>>> ");

        Reader reader = new StringReader(responseBody);
        JsonReader jsonReader = Json.createReader(reader);
        JsonObject jsonObjRespBody = jsonReader.readObject();
        JsonValue jsonValueResults = jsonObjRespBody.getOrDefault("results", JsonValue.EMPTY_JSON_ARRAY);
        JsonArray jsonArray = Json.createArrayBuilder().add(jsonValueResults).build();

        if (!jsonArray.isNull(0)) {

            JsonArray jsonArr = jsonArray;
            System.out.println(jsonArray.toString());
            return jsonArr.get(0).asJsonArray().stream()
                    // jsonArr.stream()
                    .map(
                            (result) -> {
                                // result.asJsonArray();
                                Review review = new Review();
                                JsonObject jsonObj = result.asJsonObject();
                                // return result;
                                // review.setTitle(jsonObj.getString("display_title"));
                                // review.setRating(jsonObj.getString("mpaa_rating"));
                                // review.setByline(jsonObj.getString("byline"));
                                // review.setHeadline(jsonObj.getString("headline"));
                                // review.setSummary(jsonObj.getString("summary_short"));
                                // review.setReviewURL(jsonObj.getString("link.url"));
                                review.setTitle(jsonObj.getString("display_title"));
                                review.setRating(jsonObj.getString("mpaa_rating"));
                                review.setByline(jsonObj.getString("byline"));
                                // review.setHeadline(jsonObj.getOrDefault("headline", JsonValue.NULL).toString());
                                // review.setSummary(jsonObj.getOrDefault("summary_short", JsonValue.NULL).toString());
                                review.setHeadline(jsonObj.getString("headline"));
                                review.setSummary(jsonObj.getString("summary_short"));
                                review.setReviewURL(jsonObj.getJsonObject("link").getString("url"));
                                JsonValue jsValue = jsonObj.getOrDefault("multimedia", JsonValue.NULL);
                                if (!jsValue.toString().contains("null")) {
                                    System.out.println("image is null");
                                    review.setImage(jsValue.asJsonObject().getString("src"));
                                } else {
                                    review.setImage("null");
                                }
                                // review.setImage(jsonObj.getOrDefault("multimedia", JsonValue.NULL).toString());
                                System.out.println(review.toString());
                                // System.out.println(review.getReviewURL());
                                // System.out.println(jsonObj.getOrDefault("multimedia", JsonValue.NULL).toString());
                                System.out.println(review.getImage());
                                // System.out.println(review.getSummary());
                                // System.out.println(review.getHeadline());
                                return review;

                            })
                    .toList();

        }
        return List.of();

    }

    public static Document commentToDocument(Comment comment) {
        return new Document()
                .append("title", comment.getTitle())
                .append("posterName", comment.getPosterName())
                .append("rating", comment.getRating())
                .append("comment", comment.getComment());
    }

}
