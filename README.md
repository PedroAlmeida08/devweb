# MySQL issues
Unhandled exception: Current profile has no WMI enabled.

## Solution
Go to the search bar on your Windows and search for Services. Launch Services and look for MySQLxx (xx depends on your MySQL version) in the long list of services. Right-click on MySQLxx and hit Start. MySQL should work fine now.
