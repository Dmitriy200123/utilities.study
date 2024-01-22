package demin.d.utilitiesback.repositories.requestStatistics.entities;

import lombok.Getter;

@Getter
public class UserRequestStatistics {
    private final String userName;

    private final long count;

    public UserRequestStatistics(String userName, long count) {
        this.userName = userName;
        this.count = count;
    }
}
