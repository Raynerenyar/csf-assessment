package ibf2022.batch1.csf.assessment.server.repositories;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import ibf2022.batch1.csf.assessment.server.models.Comment;
import ibf2022.batch1.csf.assessment.server.util.Util;

@Repository
public class MovieRepository {

	@Autowired
	private MongoTemplate template;

	// TODO: Task 5
	// You may modify the parameter but not the return type
	// Write the native mongo database query in the comment below
	// db.comments.find({id:1017330}).count()
	public int countComments(Object param) {
		Criteria criteria = Criteria.where("title").is(param.toString());
		Query query = Query.query(criteria);
		return (int) template.count(query, "comments");
		// return 0;
	}

	// TODO: Task 8
	// Write a method to insert movie comments comments collection
	// Write the native mongo database query in the comment below
	//	db.comments.insertOne({Document})
	public Document insertComment(Comment comment) {
		Document doc = Util.commentToDocument(comment);
		return template.insert(doc, "comments");
	}
}
