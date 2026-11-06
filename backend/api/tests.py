from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase


class UserRegistrationValidationTests(APITestCase):
    def test_username_with_spaces_is_invalid(self):
        response = self.client.post(
            reverse('register'),
            {'username': 'john doe', 'password': 'secret123'},
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn(
            'Username must be a single word without spaces.',
            response.json()['username'][0],
        )

    def test_user_can_register_with_valid_username(self):
        response = self.client.post(
            reverse('register'),
            {'username': 'johndoe', 'password': 'secret123'},
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertTrue(get_user_model().objects.filter(username='johndoe').exists())
