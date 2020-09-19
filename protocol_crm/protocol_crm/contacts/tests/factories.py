from django.template.defaultfilters import slugify
import factory
import factory.fuzzy
from ..models import Contact
from protocol_crm.users.tests.factories import UserFactory

class ContactFactory(factory.django.DjangoModelFactory):
    contact_first_name = factory.fuzzy.FuzzyText()
    contact_last_name =factory.fuzzy.FuzzyText()
    contact_phone =factory.fuzzy.FuzzyText()
    contact_email =factory.fuzzy.FuzzyText()
    slug = factory.LazyAttribute(lambda obj: slugify(obj.contact_first_name))
    contact_description = factory.Faker('paragraph', nb_sentences=3, variable_nb_sentences=True
    )
    creator = factory.SubFactory(UserFactory)

    class Meta:
        model = Contact