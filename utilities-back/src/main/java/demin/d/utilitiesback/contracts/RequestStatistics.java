package demin.d.utilitiesback.contracts;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestStatistics {
    private String requestType;

    private long count;
}
