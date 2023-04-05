package ibf2022.batch1.csf.assessment.server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private String title;
    private String posterName;
    private int rating;
    private String comment;
}
