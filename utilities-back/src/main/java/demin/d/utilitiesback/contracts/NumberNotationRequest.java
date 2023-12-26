package demin.d.utilitiesback.contracts;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NumberNotationRequest {
    private String valueToNotation;

    private int currentNotation;

    private int newNotation;
}
