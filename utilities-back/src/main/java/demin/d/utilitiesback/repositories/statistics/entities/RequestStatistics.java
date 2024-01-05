package demin.d.utilitiesback.repositories.statistics.entities;

import lombok.Getter;

@Getter
public class RequestStatistics {
    private final String requestType;
    private final long count;

    public RequestStatistics(String requestType, long count) {
        this.requestType = requestType;
        this.count = count;
    }
}
