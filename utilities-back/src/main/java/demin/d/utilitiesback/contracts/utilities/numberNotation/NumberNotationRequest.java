package demin.d.utilitiesback.contracts.utilities.numberNotation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NumberNotationRequest {
    private String valueToNotation;

    private int currentNotation;

    private int newNotation;
}
