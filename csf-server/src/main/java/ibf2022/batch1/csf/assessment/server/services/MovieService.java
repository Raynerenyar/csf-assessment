package ibf2022.batch1.csf.assessment.server.services;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import ibf2022.batch1.csf.assessment.server.models.Comment;
import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.repositories.MovieRepository;
import ibf2022.batch1.csf.assessment.server.util.Util;

@Service
public class MovieService {

	@Autowired
	private MovieRepository movieRepo;

	@Value("${nytimes.movie.api.key}")
	private String movieApiKey;

	@Value("${nytimes.movie.api.secret}")
	private String movieApiSecret;

	@Value("${nytimes.movie.review.url}")
	private String movieApiUrl;

	// TODO: Task 4
	// DO NOT CHANGE THE METHOD'S SIGNATURE
	public List<Review> searchReviews(String movieName) {

		String nytimesApiCallUrl = UriComponentsBuilder
				.fromUriString(movieApiUrl)
				.queryParam("query", movieName)
				.queryParam("api-key", movieApiKey)
				.toUriString();

		RequestEntity<Void> reqEnt = RequestEntity.get(nytimesApiCallUrl).build();

		RestTemplate restTemplate = new RestTemplate();

		ResponseEntity<String> respEnt = restTemplate.exchange(reqEnt, String.class);

		// System.out.println(respEnt.getBody());
		int httpStatusCode = respEnt.getStatusCode().value();
		if (httpStatusCode != 200) {
			return List.of();
		}

		List<Review> reviews = Util.parseMovieRespToJson(respEnt.getBody());
		reviews = reviews.stream().map(
				(review) -> {
					System.out.println("review title " + review.getTitle());
					int count = movieRepo.countComments(review.getTitle());
					System.out.println("comment count " + count);
					review.setCommentCount(count);
					return review;
				})
				.toList();
		return reviews;
	}

	public Document insertComment(Comment comment) {
		Document doc = movieRepo.insertComment(comment);
		System.out.println("inserting comment >>>>>>>> " + doc);
		return doc;
	}

}
