library(tidyverse)
library(here)
library(ISOcodes)
library(jsonlite)

here()

life.expectancy <- read_csv("https://stats.oecd.org/sdmx-json/data/DP_LIVE/.LIFEEXP.../OECD?contentType=csv&detail=code&separator=comma&csv-lang=en")
health.spending <- read_csv("https://stats.oecd.org/sdmx-json/data/DP_LIVE/.HEALTHEXP.../OECD?contentType=csv&detail=code&separator=comma&csv-lang=en")
infant.mortality <- read_csv("https://stats.oecd.org/sdmx-json/data/DP_LIVE/.INFANTMORTALITY.../OECD?contentType=csv&detail=code&separator=comma&csv-lang=en")

life.expectancy.tot <- 
  filter(life.expectancy, SUBJECT == "TOT") %>% 
  mutate(INDICATOR = "lifeExpectancy")

health.spending.tot_pct_gdp <-
  health.spending %>%
  filter(SUBJECT == "TOT", MEASURE == "PC_GDP") %>%
  mutate(INDICATOR = "healthExpPctGDP")

health.spending.tot_usd_cap <- 
  health.spending %>%
  filter(SUBJECT == "TOT", MEASURE == "USD_CAP") %>%
  mutate(INDICATOR = "healthExpPerCapita")

oecd <-
  health.spending.tot_pct_gdp %>%
  bind_rows(health.spending.tot_usd_cap) %>%
  bind_rows(life.expectancy.tot) %>%
  bind_rows(infant.mortality) %>%
  filter(LOCATION != "OAVG") %>% 
  left_join(ISO_3166_1, by=c("LOCATION"="Alpha_3")) %>% 
  select(Name, TIME, INDICATOR, Value) %>%
  rename(name=Name, year=TIME) %>% 
  spread(INDICATOR, Value) %>%
  filter(year >= 1970, year <= 2015)

write_csv(oecd, "data/oecd.csv", na = "")
write_json(oecd, "data/oecd.json")
