package ibf2022.batch1.csf.assessment.server.controllers;

import java.util.List;

import javax.print.attribute.standard.Media;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ibf2022.batch1.csf.assessment.server.models.Comment;
import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.services.MovieService;

@Controller
@CrossOrigin(origins = "*")
// @CrossOrigin(origins = "#{'${client.url}'}")
public class MovieController {

	@Autowired
	private MovieService movieSvc;

	// TODO: Task 3, Task 4, Task 8

	// consumes = MediaType.APPLICATION_JSON_VALUE
	@GetMapping(path = "/api/search")
	@ResponseBody
	public ResponseEntity<List<Review>> getMovieReviews(@RequestParam(name = "query") String movieName) {
		System.out.println("at controller  >>> " + movieName);
		List<Review> reviews = movieSvc.searchReviews(movieName);
		return ResponseEntity.status(HttpStatus.OK).body(reviews);
	}

	@PostMapping(path = "/api/comment", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Comment> postComment(@RequestBody Comment comment) {

		System.out.println("<<<<<<<<< posting comment >>>>>>>>>>> " + comment);
		System.out.println(comment);
		movieSvc.insertComment(comment);
		return ResponseEntity.status(HttpStatus.OK).body(comment);
	}

}
