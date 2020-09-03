from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from elasticsearch_dsl import analyzer, tokenizer, token_filter

from .models import AnswerPage

label_autocomplete = analyzer(
    'label_autocomplete',
    tokenizer=tokenizer('trigram', 'edge_ngram', min_gram=2, max_gram=25, token_chars=["letter", "digit"]),
    filter=['lowercase', token_filter('ascii_fold', 'asciifolding')]
)

synonynm_filter = token_filter(
    'synonym_filter_en',
    'synonym',
    synonyms_path = '/usr/share/elasticsearch/config/synonyms/synonyms_en.txt'
)

synonym_analyzer = analyzer(
    'synonym_analyzer_en',
    type='custom',
    tokenizer='standard',
    filter=[
        synonynm_filter
    ])

@registry.register_document
class AnswerPageDocument(Document):

    autocomplete = fields.CompletionField(analyzer=label_autocomplete)
    portal_topics = fields.TextField()
    portal_categories = fields.TextField()
    text = fields.TextField(attr="text", analyzer=synonym_analyzer)
    suggestions = fields.TextField(attr="text")

    def prepare_autocomplete(self, instance):
        return instance.question

    def prepare_portal_categories(self, instance):
        return [topic.heading for topic in instance.portal_category.all()]

    def prepare_portal_topics(self, instance):
        return [topic.heading for topic in instance.portal_topic.all()]

    def prepare_search_tags(self, instance):
        return instance.clean_search_tags

    class Index:
        name = 'ask-cfpb'
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}
        
    class Django:
        model = AnswerPage

        fields = [
            'search_tags',
            'language',
        ]