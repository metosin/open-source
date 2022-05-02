(ns metosin.repos
  (:require [jsonista.core :as json]
            [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.pprint :refer [pprint]]
            [clojure.string :as str]))

(defn repos
  ([]
   (repos "https://api.github.com/orgs/Metosin/repos?type=public"))
  ([url]
   (let [u (java.net.URL. url)
         c (.openConnection u)
         links (-> (.getHeaderField c "Link")
                   (str/split #",")
                   (->> (map (fn [x]
                               (let [[_ url rel] (re-matches #"<(.*)>; rel=\"(.*)\"" (str/trim x))]
                                 [rel url])))
                        (into {})))
         data (with-open [is (.getInputStream c)]
                (json/read-value is json/keyword-keys-object-mapper))]
     (if-let [x (get links "next")]
       (into data (repos x))
       data))))

(defn update-github-data []
  (let [data (repos)]
    (spit (io/file "repos.edn") (with-out-str (pprint data)))))

(def all-repos (edn/read-string (slurp (io/file "repos.edn"))))

(comment
  (update-github-data)
  (first all-repos))

(def topic->stage
  {"metosin-experimental" :experimental
   "metosin-active-development" :active-development
   "metosin-stable" :stable
   "metosin-deprecated" :deprecated})

(defn csv-export []
  (doseq [{:keys [topics archived open_issues_count] :as repo} all-repos]
    (let [stages (keep topic->stage topics)]
      (println (str (:name repo) ","
                    archived ","
                    (if (seq stages)
                      (str/join " " (map name stages))
                      "unknown") ","
                    open_issues_count)))))

(defn -main [& _]
  (csv-export))
