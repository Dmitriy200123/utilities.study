package demin.d.utilitiesback.contracts.requestStatistics;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestStatistics {
    private String requestType;

    private long count;
}
