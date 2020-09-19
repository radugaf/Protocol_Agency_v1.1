from ..models import Contact
import pytest
from .factories import ContactFactory

# Connects our tests with our database
pytestmark = pytest.mark.django_db

def test___str__():
    contact = ContactFactory()

    assert contact.__str__() == contact.contact_first_name
    assert str(contact) == contact.contact_first_name
